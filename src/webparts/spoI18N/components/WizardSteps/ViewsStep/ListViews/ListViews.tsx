import { IViewInfo } from "@pnp/sp/views";
import * as React from "react";
import { getViews } from "../../../../../../helpers/SharepointHelpers";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { useAppStore } from "../../../../store/store";
import { Stack } from "@fluentui/react";

interface IListViewsProps {
  listId: string;
}

export const ListViews = React.forwardRef((props: IListViewsProps, ref) => {
  const { listId } = props; 

  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const {toggleView, isSelected, views, setViews} = useAppStore(
    ({ selectedViews, toggleView, isSelected, views, setViews }) => (
      { selectedViews, toggleView, isSelected, views, setViews }
    )
  );

  React.useEffect(() => {
    init();
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      toggleAll: () => {
        views.get(listId).forEach(v => toggleView(v))
      }
    };
  }, [views]);

  async function init() {
    try {
      setIsLoading(true);
      const views = await getViews(listId);
      setViews(listId, views);
    } finally {
      setIsLoading(false);
    }
  }

  function _onChange(v: IViewInfo) {
    toggleView(v);
  }

  return (<div>
    {
      isLoading 
        ? <p>...loading...</p>
        : <Stack tokens={{childrenGap: 5}}>
          {
            views.get(listId)?.map(v => (
              <Checkbox 
                key      = {`Checkbox${v.Id}`}
                checked  = {isSelected(v.Id)}
                label    = {v.Title}
                onChange = {(e) => _onChange(v)}
              />
            ))
          }
        </Stack>
    }
  </div>);
});