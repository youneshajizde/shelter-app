"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { format } from "date-fns";
import useBasicFilters from "@/stores/basicFilterStore";

function BasicFilters() {
  const [checkInDate, setCheckInDate] = useState();
  const [county, setCounty] = useState("Texas");
  const { setCountyFilter, setCheckInFilter } = useBasicFilters();

  const decemberStart = new Date(2024, 11, 1);
  const decemberEnd = new Date(2024, 11, 31);

  return (
    <div className="basic-filters inline-flex flex-wrap items-center gap-2 justify-start  rounded-full p-2 text-xs">
      <Select
        value={county}
        onValueChange={setCountyFilter}
        className="flex-shrink-0"
      >
        <SelectTrigger className="w-auto sm:w-[130px] rounded-full">
          <div className="w-full text-center">{county}</div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="California">California</SelectItem>
          <SelectItem value="Arizona">Arizona</SelectItem>
          <SelectItem value="Texas">Texas</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`justify-start text-left font-normal rounded-full w-auto sm:min-w-[130px] ${
              !checkInDate ? "text-muted-foreground" : ""
            }`}
          >
            {checkInDate ? format(checkInDate, "P") : <span>Check-In</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkInDate}
            onSelect={setCheckInFilter}
            initialFocus
            minDate={decemberStart}
            maxDate={decemberEnd}
            defaultMonth={decemberStart}
          />
        </PopoverContent>
      </Popover>

      <Button className="flex items-center gap-2 bg-black rounded-full text-white">
        Search <Search className="" />
      </Button>
    </div>
  );
}

export default BasicFilters;
