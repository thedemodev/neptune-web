// Button should contain only the essential style relative to button.
// All the relative position or particular behaviours depending on parents wrapper should live inside the parent css

export const style = {
  display: 'inline-block',
  marginBottom: 0,
  fontWeight: 600,
  textAlign: 'center',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  backgroundImage: 'none',
  border: '1px solid transparent',
  whiteSpace: 'nowrap',
  padding: '12px 24px 10px',
  borderRadius: '3px',
  minHeight: '48px',
  userSelect: 'none',
  fontSize: '16px',
  lineHeight: '24px',
  '&.active,&.focus,&:active,&:focus': {
    outline: 'thin dotted',
    outlineOffset: '-2px',
  },
  '&.focus,&:focus,&:hover': {
    color: '#00b9ff',
    textDecoration: 'none',
  },

  '&.btn-lg': {
    fontSize: '20px',
    padding: '20px 24px 18px',
    lineHeight: '32px',
    borderRadius: '3px',
    minHeight: '72px',
  },

  '&.btn-sm': {
    fontSize: '14px',
    padding: '4px 16px 2px',
    borderRadius: '2px',
    minHeight: '32px',
  },
  '&.btn-xs': {
    fontSize: '12px',
    padding: '2px 8px 0',
    lineHeight: '18px',
    borderRadius: '2px',
    minHeight: '22px',
  },
};

export const stylePrimary = {
  color: '#fff',
  backgroundColor: '#00b9ff',
  borderColor: '#00b9ff',
  transition: 'all 0.15s ease-in-out',
  '&:hover,&:active,&:focus': {
    color: ' #fff',
    backgroundColor: ' #00a4df',
    borderColor: '#00a4df',
  },
};
