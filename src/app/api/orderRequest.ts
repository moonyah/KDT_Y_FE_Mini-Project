import { PushOrderListProps } from '@/@types/order.types';

const url = 'https://api.stayinn.site/v1';

const responseBody = (res: Response) => res.json();

const orderRequest = {
  getOrderList: () =>
    fetch(`${url}/orders/history?page=1&pageSize=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(responseBody),

  getOrderListDetail: ({ orderId }: any) =>
    fetch(`${url}/orders/history/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(responseBody),

  pushOrderElement: ({
    productId,
    roomId,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    guestCount,
    price,
  }: PushOrderListProps) =>
    fetch(`${url}/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registerOrderItems: [
          {
            productId: productId,
            roomId: roomId,
            checkInDate: checkInDate,
            checkInTime: checkInTime,
            checkOutDate: checkOutDate,
            checkOutTime: checkOutTime,
            guestCount: guestCount,
            price: price,
          },
        ],
      }),
    }).then(responseBody),
};

export default orderRequest;