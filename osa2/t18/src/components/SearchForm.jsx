const SearchForm = ({value, handlers}) => {
    return <>
      find countries: 
      <input id="searchForm" value={value} onChange={handlers["search"]} />
    </>
}
  
export default SearchForm