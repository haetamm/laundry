
export const FormattedDate = ( dateStr ) => {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatted = date.toLocaleDateString('id-ID', options);

  return formatted
};


export const getActionClass = (action) => {
  let actionClass = "action-button md:m-1 m-1 p-[2px] w-[50px] ";

  switch (action) {
    case 'delete':
      actionClass += "bg-red-600";
      break;
    case 'update':
      actionClass += "bg-yellow-600";
      break;
    case 'detail':
      actionClass += "bg-green-600";
      break;
    default:
      actionClass += "bg-slate-300";
  }

  return actionClass;
};


export const calculateTotalPrice = (products) => {
  let total = 0
  if (products.length > 0) {
    products.forEach((item) => {
      const subtotal = item.qty * item.product.price 
      total += subtotal 
      
    })
  }
  return total
}

export const formatNum = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}