import {
  ComboBox,
  CompoundButton,
  IBasePickerSuggestionsProps,
  IComboBoxOption,
  ITag,
  Stack,
  TagPicker,
} from "@fluentui/react";
import * as React from "react";
import { useAppStore } from "../../../../store/store";
import { CsvWriter, convertObjectToCSV } from "../../../../../../helpers/CsvHelpers";
import { downloadCSV } from "../../../../../../helpers/CsvHelpers";
import { ILocale } from "../../../../models/ILocale";

const locales: ILocale[] = require("../../../../assets/Locales.json");

const localesOptions: IComboBoxOption[] = locales.map( l => ({
  key  : l.label,
  text : l.description,
  title: l.code,
}));

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested locales',
  noResultsFoundText   : 'No locales found',
};

export function CsvStep() {
  // const [ defaultLocale, setDefaultLocale] = React.useState<string>();
  const [ targetLocales, setTargetLocales] = React.useState<ITag[]>();

  const [ defaultLocale ] = useAppStore(state => ([state.locale]));

  const [
    selectedFields, 
    selectedCts, 
    selectedLists, 
  ] = useAppStore(
    state => 
      ([
        state.selectedFields, 
        state.selectedContentTypes, 
        state.selectedLists, 
        state.selectedViews 
      ])
  );

  function onDownloadCsv() {

    const keys = targetLocales.map(tl => tl.key)
    const csvWriter = new CsvWriter(locales.filter(l => keys.includes(l.label)));

    csvWriter.addHeader();
    
    selectedFields.forEach(sf => {
      csvWriter.addRow(
        `00000000000000000000000000000000_FieldTitle${sf.InternalName}`,
        sf.Title
      );
    });
    
    selectedCts.forEach(ct => {
      const ctName = ct.Name;
      const ctDesc = ct.Description?.length ? ct.Description : `Description of ${ctName}`;

      csvWriter.addRow(
        `00000000000000000000000000000000_CTName${ct.Id}`,
        ctName
      );
      
      csvWriter.addRow(
        `00000000000000000000000000000000_CTDesc${ct.Id}`,
        ctDesc
      );
    });

    selectedLists.forEach(l => {
      const lName = l.Title;
      const lDesc = l.Description?.length ? l.Description : `Description of ${lName}`;
      const lKey  = l.Id.replaceAll('-', '');

      csvWriter.addRow( `${lKey}_ListTitle`,        lName );
      csvWriter.addRow( `${lKey}_ListDescription`,  lDesc );

      // TODO: Ho dimenticato i maledetti field della lista (la cosa più importante tra l'altro)
      // TODO: Probabilmente è giusto inserire le view in questo punto
    });

    const csv = convertObjectToCSV(csvWriter.result);

    downloadCSV(csv, 'TODO_NOME_FILE_CSV');
  }
  
  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    const textLower = filterText.toLowerCase();

    const startMatches = [];
    const includesMatches = [];

    for (const locale of locales) {
      const { label, description } = locale;

      if (label.toLowerCase().startsWith(textLower) || description.toLowerCase().startsWith(textLower)) {
        startMatches.push(locale);
      }
      else if (label.toLowerCase().includes(textLower) || description.toLowerCase().includes(textLower)) {
        includesMatches.push(locale);
      }
    }

    return [ ...startMatches, ...includesMatches].map<ITag>(x => ({ key: x.label, name: x.description}));
  };

  function onTargetLocaleChange(items?: ITag[]) {
    console.log("onTargetLocaleChange", items);
    setTargetLocales(items);
  }

  return <Stack.Item align="stretch">

    <Stack tokens={{childrenGap: 20}}>

    <Stack horizontal tokens={{childrenGap: 20}} verticalAlign="center">
      <div>
        <ComboBox
          label="Default locale"
          options={localesOptions}
          allowFreeInput
          autoComplete="on"
          defaultSelectedKey={defaultLocale}
        />
      </div>

      <Stack.Item grow >
        <label htmlFor="targetLocalesPicker" 
          style={{ 
            fontWeight: 600,
            padding   : "5px 0",
            display   : "block",
          }}
        >
          Target locales:
        </label>
        <TagPicker
          removeButtonAriaLabel  = "Remove"
          selectionAriaLabel     = "Selected locales"
          onResolveSuggestions   = {filterSuggestedTags}
          pickerSuggestionsProps = {pickerSuggestionsProps}
          onChange               = {onTargetLocaleChange}
          defaultSelectedItems   = {targetLocales}
          inputProps={{
            id:"targetLocalesPicker"
          }}
          styles={{input: {background: "white"}}}
        />
      </Stack.Item>
    </Stack>

      <Stack tokens={{childrenGap: 20}} horizontal horizontalAlign="center">
        <CompoundButton primary 
          iconProps={{iconName: 'EditNote'}}
          secondaryText="Open popup to edit the CSV." 
          onClick={onDownloadCsv} 
        >
          Edit CSV
        </CompoundButton>
        
        <CompoundButton primary 
          iconProps={{iconName: 'Download'}}
          secondaryText="Download the file to edit in local."
          onClick={onDownloadCsv} 
        >
          Download CSV
        </CompoundButton>

        <CompoundButton primary 
          iconProps={{iconName: 'Upload'}}
          secondaryText="Upload the edited file."
          onClick={onDownloadCsv} 
        >
          Upload CSV
        </CompoundButton>
      
      </Stack>
    </Stack>

  </Stack.Item>
}