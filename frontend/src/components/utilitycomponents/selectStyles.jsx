export const selectStyles = {
  menu: (defaultStyles) => ({
    ...defaultStyles,
    maxWidth: '256px',
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? '#fff' : '#011d29',
    backgroundColor: state.isSelected ? '#011d29' : '#fff',
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: '#fff',
    color: '#011d29',
    padding: '2px',
    border: 'solid 1px',
    borderColor: '#011d29',
    borderRadius: 'none',
    boxShadow: 'none',
    maxWidth: '16rem',
    outline: 'none',
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#011d29' }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#011d29',
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    'input:focus': {
      boxShadow: 'none',
      borderColor: '#011d29',
    },
  }),
  container: (defaultStyles) => ({ ...defaultStyles, marginBottom: '6px' }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    maxHeight: '136px',
    maxWidth: '256px',
  }),
}
