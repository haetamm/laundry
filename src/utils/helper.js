export const FormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatted = date.toLocaleDateString("id-ID", options);

  return formatted;
};

export const getActionClass = (action) => {
  const baseClass = "px-3 py-1 text-sm rounded border transition-colors font-medium";
  
  switch(action) {
    case "detail":
      return `${baseClass} bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200`;
    case "update":
      return `${baseClass} bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200`;
    case "delete":
      return `${baseClass} bg-red-100 text-red-700 border-red-200 hover:bg-red-200`;
    default:
      return `${baseClass} bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200`;
  }
};

export const calculateTotalPrice = (products) => {
  let total = 0;
  if (products.length > 0) {
    products.forEach((item) => {
      const subtotal = item.qty * item.product.price;
      total += subtotal;
    });
  }
  return total;
};

export const formatNum = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const menuFields = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/terms", label: "Terms" },
  { path: "/guest/login", label: "Login" },
];

export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const isActive = (currentPrefix, targetPrefix) => {
  return currentPrefix === targetPrefix;
};
