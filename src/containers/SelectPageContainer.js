import React from 'react';
import { SelectPage } from 'components';
import { SelectPageToppingList } from '../components';

export default function SelectPageContainer() {
  return (
    <div>
      <SelectPage />
      <SelectPageToppingList />
    </div>
  );
}
