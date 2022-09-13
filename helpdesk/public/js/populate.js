function populateAtividades () {
  $('#myTab a')
    .append('<span class="badge badge-secondary ml-1">' +
            $('#dataTable').DataTable().column(0).data().length + '</span>')

  let status = $('#dataTable').DataTable()
    .column(4)
    .data()
    .unique()
    .toArray()

  Array.from(status).sort().forEach(function (nome) {
    let countStatus = $('#dataTable').DataTable()
      .column(4)
      .data()
      .filter(function (value) {
        return value === nome
      })
    $('#myTab')
      .append('<li class="nav-item"></li>')
      .append('<a class="nav-link" href="#">' +
                nome +
                '<span class="badge badge-secondary ml-1">' + countStatus.length + '</span>' +
                '</a>'
      )
  })

  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).parent().parent().find('a').removeClass('active')
    $(this).toggleClass('active')

    let search = $($(this).contents()[0]).text()
    if (search == 'All') {
      search = ''
    }

    $('#dataTable').DataTable()
      .columns(4)
      .search(search)
      .draw()
  })
}

function populateChamados () {
  $('#myTab a')
    .append('<span class="badge badge-secondary ml-1">' +
            $('#dataTable').DataTable()
              .column(0)
              .data()
              .length +
            '</span>')

  let status = $('#dataTable').DataTable()
    .column(7)
    .data()
    .unique()
    .toArray()

  Array.from(status).sort().forEach(function (nome) {
    let countStatus = $('#dataTable').DataTable()
      .column(7)
      .data()
      .filter(function (value) {
        return value === nome
      })
    $('#myTab')
      .append('<li class="nav-item"></li>')
      .append('<a class="nav-link" href="#">' +
                nome +
                '<span class="badge badge-secondary ml-1">' + countStatus.length + '</span>' +
                '</a>'
      )
  })

  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).parent().parent().find('a').removeClass('active')
    $(this).toggleClass('active')

    let search = $($(this).contents()[0]).text()
    if (search == 'Opened') {
      search = ''
    }

    $('#dataTable').DataTable()
      .columns(7)
      .search(search)
      .draw()
  })
}

let columnDef = [{
  targets: [8, 9],
  searchable: true,
  visible: false
}]
