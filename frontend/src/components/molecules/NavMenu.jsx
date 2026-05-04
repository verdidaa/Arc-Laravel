import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function NavMenu({ items, selectedIndex = 0 }) {
  return (
    <List disablePadding sx={{ mb: 4 }}>
      {items.map((item, index) => (
        <ListItem key={item} disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            selected={index === selectedIndex}
            sx={{
              borderRadius: 3,
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: 'rgba(255,255,255,0.14)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'rgba(255,255,255,0.18)',
              },
            }}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default NavMenu;
