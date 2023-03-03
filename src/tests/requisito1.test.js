import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import mockApi from "./mockApi";
import ApiProvider from "../context/ApiProvider";

afterEach(jest.restoreAllMocks)

describe('requisito 1', () => {
  it('Verifica e é feita a requisiçao corretamente para Api', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })
    render(<ApiProvider><App /></ApiProvider>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('STAR WARS')).toBeInTheDocument();


  })

  it('Verifica e é feita a requisiçao retorna erro em caso de falha', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockRejectedValue(new Error('... is not valid JSON'));
    render(<ApiProvider><App /></ApiProvider>);
    

  })
})


