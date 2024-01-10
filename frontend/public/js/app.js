var truepush = window.truepush || [];
truepush.push(function () {
  truepush.Init(
    {
      id: "659d4acafc5b0013c8d787d8",
    },
    function (error) {
      if (error) console.error(error);
    }
  );
});

truepush.push({
  operation: "add-tags",
  data: [
    {
      tagName: "userId",
      tagType: "string",
      tagValue: JSON.parse(localStorage.notificationParams).userId,
    },
  ],
  callback: function (error, response) {
    console.log(error, response);
  },
});

truepush.push({ 
    operation: "get-tags",
    callback: function(error,response){
                console.log(error,response);
        }
})