import { IViewInfo } from "@pnp/sp/views";
import * as React from "react";
import { getViews } from "../../../../helpers/SharepointHelpers";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { useAppStore } from "../../store/store";
import { Stack } from "@fluentui/react";

interface IListViewsProps {
  listId: string;
}

export const ListViews = React.forwardRef((props: IListViewsProps, ref) => {
  const { listId } = props; 

  const [ views, setViews ] = React.useState<IViewInfo[]>();

  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const {toggleView, isSelected} = useAppStore(
    ({ selectedViews, toggleView, isSelected }) => (
      { selectedViews, toggleView, isSelected }
    )
  );

  React.useEffect(() => {
    init();
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      selectAll: () => {
        views.forEach(v => toggleView(v))
      }
    };
  }, [views]);

  async function init() {
    try {
      setIsLoading(true);
      const views = await getViews(listId);
      setViews(views);
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
            views?.map(v => (
              <Checkbox 
                checked={isSelected(v.Id)}
                label={v.Title}  
                onChange={(e) => _onChange(v)} 
              />
            ))
          }
        </Stack>
    }
  </div>);
});