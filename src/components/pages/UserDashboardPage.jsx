import { useState } from 'react';
import ProductDialog from '../organisms/ProductDialog.jsx';
import { products, userNavItems } from '../data/dashboardData.js';
import UserDashboardTemplate from '../templates/UserDashboardTemplate.jsx';

const PAGE_SIZE = 3;
const emptyProduct = {
  name: '',
  sku: '',
  category: '',
  stock: 0,
  price: '',
  status: 'Active',
};

function UserDashboardPage({ onLogout, user }) {
  const [productList, setProductList] = useState(products);
  const [page, setPage] = useState(1);
  const [dialogMode, setDialogMode] = useState('add');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftProduct, setDraftProduct] = useState(emptyProduct);
  const [editingSku, setEditingSku] = useState(null);
  const pageCount = Math.ceil(productList.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedProducts = productList.slice(startIndex, startIndex + PAGE_SIZE);

  function openAddDialog() {
    setDialogMode('add');
    setEditingSku(null);
    setDraftProduct(emptyProduct);
    setIsDialogOpen(true);
  }

  function openEditDialog(product) {
    setDialogMode('edit');
    setEditingSku(product.sku);
    setDraftProduct({
      ...product,
      price: product.price.replace('$', ''),
    });
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingSku(null);
    setDraftProduct(emptyProduct);
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setDraftProduct((current) => ({
      ...current,
      [name]: name === 'stock' ? Number(value) : value,
    }));
  }

  function normalizeProduct(product) {
    return {
      ...product,
      name: product.name.trim(),
      sku: product.sku.trim().toUpperCase(),
      category: product.category.trim(),
      price: product.price.startsWith('$') ? product.price : `$${product.price}`,
    };
  }

  function handleSaveProduct() {
    const normalizedProduct = normalizeProduct(draftProduct);

    if (dialogMode === 'edit') {
      setProductList((current) =>
        current.map((product) =>
          product.sku === editingSku ? normalizedProduct : product
        )
      );
    } else {
      setProductList((current) => [...current, normalizedProduct]);
      setPage(Math.ceil((productList.length + 1) / PAGE_SIZE));
    }

    closeDialog();
  }

  return (
    <>
      <UserDashboardTemplate
        currentPage={page}
        navItems={userNavItems}
        onAddProduct={openAddDialog}
        onEditProduct={openEditDialog}
        onLogout={onLogout}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        pageCount={pageCount}
        products={paginatedProducts}
        user={user}
      />
      <ProductDialog
        onClose={closeDialog}
        onFieldChange={handleFieldChange}
        onSubmit={handleSaveProduct}
        open={isDialogOpen}
        product={draftProduct}
        submitLabel={dialogMode === 'edit' ? 'Save Changes' : 'Add Product'}
        title={dialogMode === 'edit' ? 'Edit Product Details' : 'Add Product'}
      />
    </>
  );
}

export default UserDashboardPage;
