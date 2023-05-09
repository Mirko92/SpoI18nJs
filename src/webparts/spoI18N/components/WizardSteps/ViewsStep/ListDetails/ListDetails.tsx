import { IListInfo } from "@pnp/sp/lists";
import * as React from "react";
import { Details } from "../../../Details/Details";
import { ListViews } from "../ListViews/ListViews";

interface IListDetailsProps {
  list: IListInfo;
}

export const ListDetails = React.forwardRef((props: IListDetailsProps, ref) => {
  const listViewsRef = React.useRef<typeof ListViews>();

  const { list } = props;

  async function loadViews(listId: string) {
    console.log`Loading views for: ${listId}`;
  }
  
  function _onToggleAll() {
    (listViewsRef.current as any).toggleAll();
  }

  React.useImperativeHandle(ref, () => {
    return { toggleAll: _onToggleAll }
  }, [list]);

  return <Details 
    listId      = {list.Id}
    title       = {list.Title}
    onOpen      = {() => loadViews(list.Id)}
    onToggleAll = {() => _onToggleAll()}
  > 
    <ListViews listId={list.Id} ref={listViewsRef}/>
  </Details>
});