export const navItems = ['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'];
export const userNavItems = ['Home', 'Products', 'Orders', 'Profile'];
export const stats = [
  { label: 'Products', value: '128', detail: '12 added this week', color: '#0f766e' },
  { label: 'Orders', value: '342', detail: '28 pending shipment', color: '#1d4ed8' },
  { label: 'Revenue', value: '$24.8K', detail: '8.4% above target', color: '#c2410c' },
];
export const products = [
  {
    name: 'Wireless Headphones',
    sku: 'WH-2048',
    category: 'Audio',
    stock: 84,
    price: '$129.00',
    status: 'Low Stock',
  },
  {
    name: 'Smart Watch Pro',
    sku: 'SW-1092',
    category: 'Wearables',
    stock: 35,
    price: '$249.00',
    status: 'Low Stock',
  },
  {
    name: 'Portable Speaker',
    sku: 'PS-3310',
    category: 'Audio',
    stock: 120,
    price: '$89.00',
    status: 'Active',
  },
  {
    name: 'Laptop Sleeve',
    sku: 'LS-4411',
    category: 'Accessories',
    stock: 0,
    price: '$39.00',
    status: 'Out of Stock',
  },
];

export const recentOrders = [
  { id: '#3021', customer: 'Maria Santos', total: '$182.00', state: 'Paid' },
  { id: '#3018', customer: 'John Reyes', total: '$79.00', state: 'Packed' },
  { id: '#3012', customer: 'Lea Cruz', total: '$249.00', state: 'Processing' },
];

export const userRoles = [
  { name: 'Olivia Hart', email: 'olivia@northlane.shop', role: 'Admin', status: 'Active' },
  { name: 'Marco Diaz', email: 'marco@northlane.shop', role: 'Manager', status: 'Active' },
  { name: 'Anne Cruz', email: 'anne@northlane.shop', role: 'Editor', status: 'Invited' },
  { name: 'Leo Ramos', email: 'leo@northlane.shop', role: 'Viewer', status: 'Suspended' },
];

export const defaultUser = {
  name: 'Olivia',
  role: 'Store Administrator',
  email: 'olivia@northlane.shop',
  completion: 78,
};
