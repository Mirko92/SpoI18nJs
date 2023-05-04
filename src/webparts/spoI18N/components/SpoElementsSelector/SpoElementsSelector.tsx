import * as React from "react";

import { Stack } from '@fluentui/react/lib/Stack';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Elements } from "../../models/Elements";
import { useAppStore } from "../../store/store";

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

export function SpoElementsSelector() {

  const { selectedElements, setSelectedElements } = useAppStore(state => ({
    selectedElements    : state.selectedElements,
    setSelectedElements : state.setSelectedElements
  }))

  const handleCheckboxChange = React.useCallback(
    (event, checked) => {
      const option = event.target.value;

      setSelectedElements (
        checked
          ? [...selectedElements, option]
          : selectedElements.filter((item) => item !== option)
      );
    },
    [selectedElements]
  );

  function isChecked(value: Elements) {
    return selectedElements.includes(value);
  }

  return (
    <form>
      <h2>Seleziona gli elementi che intendi tradurre: </h2>

      <div>
        <pre>{JSON.stringify(selectedElements)}</pre>
      </div>


      <Stack tokens={stackTokens}>
        <Checkbox 
          label="Columns"       
          name="selectedElements"
          checked={isChecked(Elements.COLUMNS)}
          onChange={handleCheckboxChange} 
          inputProps={{
            value: Elements.COLUMNS,
          }}
        />
        <Checkbox 
          label="Content types" 
          name="selectedElements"
          checked={isChecked(Elements.CONTENT_TYPES)}
          onChange={handleCheckboxChange} 
          inputProps={{
            value: Elements.CONTENT_TYPES
          }}
        />
        <Checkbox 
          label="Lists"         
          name="selectedElements"
          checked={isChecked(Elements.LISTS)}
          onChange={handleCheckboxChange} 
          inputProps={{
            value: Elements.LISTS
          }}
        />
        <Checkbox 
          label="Views"         
          name="selectedElements"
          checked={isChecked(Elements.VIEWS)}
          onChange={handleCheckboxChange} 
          inputProps={{
            value: Elements.VIEWS
          }}
        />
      </Stack>

    </form>
  );
}
