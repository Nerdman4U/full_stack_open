const SearchForm = ({value, handleSearchChange}) => {
    return <>
      find countries: 
      <input value={value} onChange={handleSearchChange} />
    </>
}
  
export default SearchForm