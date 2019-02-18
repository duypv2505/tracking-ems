import * as Service from '../../../common/common-service';

export const trackingEMS = (code) => async (dispatch) => {
  let result = null;
  // var headers = {
  //   'Content-Type': 'application/json',
  //   'Trackingmore-Api-Key': 'e534a472-b74a-4f56-82e7-0e1e1c9023a1'
  // }
  var body = {
    "tracking_number": code,
    "carrier_code": "vietnam-post"
  }
  var url = "https://api.trackingmore.com/v2/trackings/post";
  // post tracking to api
  await Service.postAPI('/trackingEMS',
    {
      url: url,
      param: body,
      tracking_number: code
    },
    {}, dispatch, null)
    .then(response => {
      result = response;
    })
    .catch(() => {
    });
  return result;
}
