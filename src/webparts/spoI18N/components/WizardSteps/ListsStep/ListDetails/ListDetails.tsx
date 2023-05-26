import * as React from "react";
import { MpCard } from "../../../../../../components/MpCard/MpCard";

export function ListDetails() {
  return (
    <MpCard>
      <MpCard.Title>
        <h2>List title</h2>
      </MpCard.Title>

      <MpCard.Body>
        <MpCard>
          <MpCard.Title>
            <h3>Fields</h3>
          </MpCard.Title>

          <MpCard.Body>
            <ul>
              <li>Field #1</li>
              <li>Field #2</li>
              <li>Field #3</li>
            </ul>
          </MpCard.Body>
        </MpCard>

        <MpCard>
          <MpCard.Title>
            <h3>Content Types</h3>
          </MpCard.Title>

          <MpCard.Body>
            <ul>
              <li>CT #1</li>
              <li>CT #2</li>
              <li>CT #3</li>
            </ul>
          </MpCard.Body>
        </MpCard>

        <MpCard>
          <MpCard.Title>
            <h3>Views</h3>
          </MpCard.Title>

          <MpCard.Body>
            <ul>
              <li>View #1</li>
              <li>View #2</li>
              <li>View #3</li>
            </ul>
          </MpCard.Body>
        </MpCard>
      </MpCard.Body>
    </MpCard>
  );
}
