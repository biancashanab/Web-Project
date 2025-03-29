import { useState } from "react";
import { filterOptions } from "../../config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button"; // Asum că ai un buton definit în proiect

function PetFilter({ filters, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background rounded-lg shadow-sm">
      {/* Buton de toggle vizibil doar pe ecrane mici */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-extrabold">Filters</h2>
        <Button
          className="md:hidden" // Ascunde butonul pe ecrane mari
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide" : "Show"}
        </Button>
      </div>

      {/* Filtrele, ascunse pe mobil dacă isOpen e false */}
      <div className={`p-4 space-y-4 ${isOpen ? "block" : "hidden"} md:block`}>
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => {
                  const isChecked =
                    filters &&
                    Object.keys(filters).length > 0 &&
                    filters[keyItem] &&
                    filters[keyItem].includes(option.id);

                  return (
                    <Label
                      key={option.id}
                      className={`flex items-center gap-2 ${
                        isChecked ? "font-bold" : "font-medium"
                      }`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default PetFilter;
