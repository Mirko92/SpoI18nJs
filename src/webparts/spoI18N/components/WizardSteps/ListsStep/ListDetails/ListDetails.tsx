import * as React from "react";
import { MpCard } from "../../../../../../components/MpCard/MpCard";
import { Checkbox } from "@fluentui/react";
import styles from "./ListDetails.module.scss";
export interface ListDetailsProps {
  listTitle: string; 
}

export function ListDetails(props: ListDetailsProps) {
  const { listTitle } = props; 

  return (
    <div style={{marginBottom: '1rem'}}>
      <MpCard>
        <MpCard.Title>
          <Checkbox />  
          <h2>{listTitle}</h2>
        </MpCard.Title>

        <MpCard.Body>
          <MpCard>
            <MpCard.Title>
              <Checkbox />  
              <h3>Fields</h3>
            </MpCard.Title>

            <MpCard.Body>
              <ul className={styles.subList}>
                <li>Field #1</li>
                <li>Field #2</li>
                <li>Field #3</li>
              </ul>
            </MpCard.Body>
          </MpCard>

          <MpCard>
            <MpCard.Title>
              <Checkbox />  
              <h3>Content Types</h3>
            </MpCard.Title>

            <MpCard.Body>
              <ul className={styles.subList}>
                <li>CT #1</li>
                <li>CT #2</li>
                <li>CT #3</li>
              </ul>
            </MpCard.Body>
          </MpCard>

          <MpCard>
            <MpCard.Title>
              <Checkbox />  
              <h3>Views</h3>
            </MpCard.Title>

            <MpCard.Body>
              <ul className={styles.subList}>
                <li>View #1</li>
                <li>View #2</li>
                <li>View #3</li>
              </ul>
            </MpCard.Body>
          </MpCard>
        </MpCard.Body>
      </MpCard>
    </div>
  );
}
