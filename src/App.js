import React from "react";
import {
  ReactiveBase,
  ReactiveList,
  DataSearch,
  RangeInput,
  SelectedFilters,
  ToggleButton
} from "@appbaseio/reactivesearch";

import Table from './Table'

function renderData({ data }) {
  return (
    <Table
      data={data}
      columns={[
        {
          Header: () => null,
          id: "expander",
          Cell: ({ row }) => (
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? "👇" : "👉"}
            </span>
          )
        },
        {
          Header: "Nome",
          accessor: "name",
          Cell: ({ row }) => (
            <div>
              <div>
                {row.values.name}
              </div>
              <div>
                {row.values.cpf}
              </div>
            </div>
          )
        },
        {
          Header: "Plano",
          accessor: "plan_broker"
        },
        {
          Header: "Data de Aniversario",
          accessor: "birthday"
        },
        {
          Header: "Total",
          accessor: "total"
        },
        {
          Header: "gender",
          accessor: "gender"
        },
        {
          Header: "Status ",
          accessor: "status"
        }
      ]}
    />
  )
}

function renderPagination({ pages, totalPages, currentPage, setPage }) {
  return (
    <div>
      <div>Pages {pages}</div>
      <div>CurrentPage {currentPage}</div>
      <div>TotalPages {totalPages}</div>
      <button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Anterior</button>
      <button disabled={currentPage === totalPages - 1} onClick={() => setPage(currentPage + 1)}>Próximo</button>
    </div>
  );
}

function App() {
  return (
    <ReactiveBase url="http://ctesk-elasticsearch.apikihomolog.com:9200" app="ctesk">
      <SelectedFilters
        showClearAll={true}
        clearAllLabel="Limpar"
      />
      <br />
      <ToggleButton
        componentId="Status"
        dataField="status"
        multiSelect={false}
        data={
          [
            { "label": "Ativo", "value": "ATIVO" },
            { "label": "Em Implantação", "value": "EM IMPLANTAÇÃO" },
            { "label": "Cancelado", "value": "CANCELADA" }
          ]
        }
      />
      <br />
      <DataSearch componentId="SearchSensor" dataField={['name']} />
      <br />
      <RangeInput
        componentId="RangeInputComponent"
        dataField="total"
        title="Valor"
        range={{
          start: 100,
          end: 2000,
        }}
      />
      <br />
      <ReactiveList
        componentId="result"
        dataField="name"
        title="Results"
        size={20}
        react={{
          and: ['SearchSensor', 'RangeInputComponent', 'Status'],
        }}
        pagination={true}
        showResultStats={false}
        infiniteScroll={false}
        renderPagination={renderPagination}
        render={renderData}
      />
    </ReactiveBase>
  );
}


export default App;
