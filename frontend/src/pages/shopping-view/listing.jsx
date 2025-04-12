import PetFilter from "../../components/shopping/filter";
import PetDetailsDialog from "../../components/shopping/pets-details";
import ShoppingPetTile from "../../components/shopping/pets-tile";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { toast } from "sonner";
import { sortOptions } from "../../config";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import {
  fetchAllFilteredPets,
  fetchPetDetails,
} from "../../store/shop/pets";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) 
{
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

 // console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() 
{
  const dispatch = useDispatch();
  const { petList, PetDetails } = useSelector(
    (state) => state.shopPets
  );


  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    console.log(indexOfCurrentSection, "indexOfCurrentSection");
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    console.log(cpyFilters, "cpyFilters");
  }

  function handleGetPetDetails(getCurrentPetId) 
  {
    dispatch(fetchPetDetails(getCurrentPetId));
  }

  function handleAddtoCart(getCurrentPetId) 
  {
   // console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex( (item) => item.PetId === getCurrentPetId);
    }

    dispatch(
      addToCart({
        userId: user?.id,
        PetId: getCurrentPetId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.message("Pet is added to cart");
      }
    });
  }

  useEffect(() => {
    setSort("age-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    console.log("Filters changed:", filters);
    console.log("Sort changed:", sort);
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredPets({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (PetDetails !== null) setOpenDetailsDialog(true);
  }, [PetDetails]);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <PetFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Pets</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {petList?.length} Pets
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {petList && petList.length > 0
            ? petList.map((PetItem) => (
              <ShoppingPetTile
                key={PetItem._id}
                handleGetPetDetails={handleGetPetDetails}
                pet={PetItem}
                handleAddtoCart={handleAddtoCart} />
            ))
            : null}
        </div>
      </div>
      <PetDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        PetDetails={PetDetails} />
    </div>
  );
}

export default ShoppingListing;