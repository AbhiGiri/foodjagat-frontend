import { useSearchRestaurants } from "@/apis/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const {city} = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({searchQuery: '', page: 1, selectedCuisines: [], sortOption: 'bestMatch'})
  const {results, isLoading} = useSearchRestaurants(SearchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      page: 1,
      sortOption
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }))
  };

  if(isLoading) {
    return <span>Loading...</span>
  };

  if(!results?.data || !city) {
    return <span>No results found.</span>;
  };

  const setSearchQuery = (SearchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: SearchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,

    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cousines-list">
        <CuisineFilter 
          selectedCuisines={SearchState.selectedCuisines}
          onChange={setSelectedCuisines} 
          isExpanded={isExpanded} 
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded) }          
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar 
          onSubmit={setSearchQuery} 
          placeHolder="Search by Cuisine or Restaurant Name" 
          onReset={resetSearch}
          searchQuery={SearchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city}/>
          <SortOptionDropdown sortOption={SearchState.sortOption} onChange={(value) => setSortOption(value)}/>
        </div>
        {results?.data?.map((restaurnat, i) => (
          <SearchResultCard key={i} restaurant={restaurnat} />
        ))}  
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={() =>setPage(results.pagination.page)}/>
      </div>
    </div>

  )
}

export default SearchPage;