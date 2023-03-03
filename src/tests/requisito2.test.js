import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
import App from "../App";
import mockApi from "./mockApi";
import ApiProvider from "../context/ApiProvider";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
afterEach(jest.restoreAllMocks)
describe('requisito 2', () => {
  it('Verifica a tabela e filtrada corretamente ', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })
    render(<ApiProvider><App /></ApiProvider>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('STAR WARS')).toBeInTheDocument();
   
    expect(await screen.findByRole('heading', { name: /star wars/i})).toBeInTheDocument()
    
    // filtro por texto
    const input = await screen.findByTestId('name-filter')
    userEvent.type(input, 'tatooine')
    expect(await screen.findByRole('cell', { name: /tatooine/i})).toBeInTheDocument()
    const row = screen.getAllByRole('row');
    expect(row).toHaveLength(2);
    userEvent.clear(input);

    // filtros de comparaçao numerica population igual a 01000
    const columFilter = screen.getByRole('combobox', { name: /coluna/i});
    expect(columFilter).toHaveLength(5)
    const operador = screen.getByRole('combobox', { name: /operador/i});
    expect(operador).toHaveLength(3)
    const valor = screen.getByRole('spinbutton');
    userEvent.click(columFilter)
    expect(screen.getAllByRole('option', { name: 'population'})).toHaveLength(2)
    
    userEvent.selectOptions(columFilter, 'population')
    userEvent.selectOptions(operador, 'maior que')
    userEvent.clear(valor)
    userEvent.type(valor, '1000')
    const btnFilter = screen.getByText('Filtrar')
    userEvent.click(btnFilter);
    expect(screen.getAllByRole('option', { name: 'population'})).toHaveLength(1)

    expect(await screen.findByText(/population maior que 1000/i))
    const row2 = screen.getAllByRole('row');
    expect(row2).toHaveLength(8);
    
    // filtro diameter menor que 10465
    
    userEvent.selectOptions(columFilter, 'diameter')
    userEvent.selectOptions(operador, 'menor que')
    userEvent.clear(valor)
    userEvent.type(valor, '12500')
   
    userEvent.click(btnFilter);
    expect(await screen.findByText(/population maior que 1000/i))
    expect(await screen.findByText(/diameter menor que 12500/i))

    // filtro orbital_period igual a 18
    userEvent.selectOptions(columFilter, 'rotation_period')
    userEvent.selectOptions(operador, 'igual a')
    userEvent.clear(valor)
    userEvent.type(valor, '18')
    userEvent.click(btnFilter);
    expect(await screen.findByText(/population maior que 1000/i))
    expect(await screen.findByText(/diameter menor que 12500/i))
    expect(await screen.findByText(/rotation_period igual a 18/i))
    expect(screen.getByRole('cell', {name: /endor/i})).toBeInTheDocument();
  

    

    // Botao de remover apenas 1 filtro
    const view = screen.getByText(/rotation_period igual a 18/i);
    const removeBtn = within(view).getByRole('button', {name: /💢/i});
    userEvent.click(removeBtn);
    const row3 = screen.getAllByRole('row');
    expect(row3).toHaveLength(5);

    const btnRemoveAll = screen.getByRole('button', {name: /remover todas filtragens/i})
    userEvent.click(btnRemoveAll);
    const row4 = screen.getAllByRole('row');
    expect(row4).toHaveLength(11);

    // filtro de ordenaçao
    const oredenar = screen.getByRole('combobox', {name: /ordenar/i})
    const asc = screen.getByRole('radio', {name: /ascendente/i})
    const desc = screen.getByRole('radio', { name: /descendente/i})
    const btnOrdena = screen.getByRole('button', {name: /ordenar/i})

    userEvent.selectOptions(oredenar, 'population')
    userEvent.click(asc)
    userEvent.click(btnOrdena)

    const row5 = screen.getAllByRole('row');

    expect(row5[1].innerHTML).toContain('Yavin IV');
    expect(row5[2].innerHTML).toContain('Tatooine');
    expect(row5[3].innerHTML).toContain('Bespin');

    userEvent.selectOptions(oredenar, 'population')
    userEvent.click(desc)
    userEvent.click(btnOrdena)

    const row6 = screen.getAllByRole('row');

    expect(row6[1].innerHTML).toContain('Coruscant');
    expect(row6[2].innerHTML).toContain('Naboo');
    expect(row6[3].innerHTML).toContain('Alderaan');

  
  })

})


