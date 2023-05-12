import { IBasePickerSuggestionsProps, ITag, PrimaryButton, Stack, TagPicker } from "@fluentui/react";
import * as React from "react";
import { useAppStore } from "../../../../store/store";
import { convertObjectToCSV } from "../../../../../../helpers/CsvHelpers";
import { downloadCSV } from "../../../../../../helpers/CsvHelpers";
import { ILocale } from "../../../../models/ILocale";

const locales: ILocale[] = require("../../../../assets/Locales.json");

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested locales',
  noResultsFoundText   : 'No locales found',
};

export function CsvStep() {
  // const [ defaultLocale, setDefaultLocale] = React.useState<string>();
  // const [ targetLocales, setTargetLocales] = React.useState<string[]>();

  const {columns, contentTypes, selectedLists, selectedViews } = useAppStore(
    ({fields: columns, contentTypes, selectedLists, selectedViews }) => 
      ({columns, contentTypes, selectedLists, selectedViews })
  );

  function onDownloadCsv() {
    const data = [
           columns.map( c => ({key: '', default: ''})),
      contentTypes.map(ct => ({key: '', default: ''})),
      selectedLists.map(l => ({key: '', default: ''})),
      selectedViews.map(v => ({key: '', default: ''})),
    ];

    const csv = convertObjectToCSV(data);

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

    return [ ...startMatches, ...includesMatches].map<ITag>(x => ({ key: x.code, name: x.description}));
  };

  function onTargetLocaleChange(items?: ITag[]) {
    console.log("onTargetLocaleChange", items);
  }

  return <Stack.Item align="stretch">

    <Stack tokens={{childrenGap: 20}}>

      <div>
        <label htmlFor="defaultLocalePicker">
          Default locale:
        </label>
        <TagPicker
          removeButtonAriaLabel  = "Remove"
          selectionAriaLabel     = "Selected locales"
          onResolveSuggestions   = {filterSuggestedTags}
          pickerSuggestionsProps = {pickerSuggestionsProps}
          onChange               = {onTargetLocaleChange}
          inputProps={{
            id:"defaultLocalePicker"
          }}
        />
      </div>
      <div>
        <label htmlFor="targetLocalesPicker">
          Target locales:
        </label>
        <TagPicker
          removeButtonAriaLabel  = "Remove"
          selectionAriaLabel     = "Selected locales"
          onResolveSuggestions   = {filterSuggestedTags}
          pickerSuggestionsProps = {pickerSuggestionsProps}
          onChange               = {onTargetLocaleChange}
          inputProps={{
            id:"targetLocalesPicker"
          }}
        />
      </div>

      <Stack tokens={{childrenGap: 20}} horizontal horizontalAlign="center">
        <PrimaryButton text="Edit CSV"      onClick={onDownloadCsv} iconProps={{iconName: 'EditNote'}}/>
        <PrimaryButton text="Download CSV"  onClick={onDownloadCsv} iconProps={{iconName: 'DownloadDocument'}}/>
      </Stack>
    </Stack>

  </Stack.Item>
}