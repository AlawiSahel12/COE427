export const OrderStatus = Object.freeze({
    WAITING: 'waiting',
    SERVED: 'served'
  } as const);



export const Actions =  Object.freeze({

  NEW_ORDER:"newOrder",
  ORDER_LIST_UPDATE:"orderListUpdate",
  ADD_PREPARED_MEAL:"addPreparedMeal",
  ADD_PREPARED_SANDWICH:"addPreparedSandwich",
  UPDATE_MEALS:"updateMeal",
  UPDATE_SANDWICH:"updateSandWich",
  UPDATE_ORDER_STATE:"updateOrderState",
  ORDER_CREATION: "orderCreation"


}as const);
