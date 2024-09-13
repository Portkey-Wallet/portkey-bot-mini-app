import request from './axios';


export const reportAccount = async (body: { caHash: string, operationType: string }): Promise<void> => {
  console.log('exe reportAccount!')
  return request.post('/app/report/account', {clientType: 'TgBot', projectCode: '10000', ...body});
};
// export const setCurUsingBeanPass = async (body: ISetCurBeanBody): Promise<IBeanPassListItem> => {
//   return request.post('/app/bean-pass/using', body);
// };