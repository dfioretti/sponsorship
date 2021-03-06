var Dispatcher = {
  post: function(path, params, successCallback) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: path,
      data: JSON.stringify(params),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  },
  apiGet: function(path, params, successCallback) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/v1/ews/teneo_api",
      data: $.extend(params, {path: path}),
      success: function(data, status, xhr) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log("ERROR");
        console.log(xhr);
        console.log(status);
        console.log(error);
      }
    });
  },
  fifaGet: function(url, params, successCallback) {
    params.client_id = 'fifa';
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: url,
      data: params,
      headers: {
        'Accept': 'json',
        'Authorization': API_KEYS.FIFA
      },
      cache: false,
      success: function(data, status, xhr) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log("ERROR");
        console.log(xhr);
        console.log(status);
        console.log(error);
      }
    });
  }

}
