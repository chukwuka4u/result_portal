import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckBox = ({name, value} : {name: string, value: string}) => (
  <div style={{ display: 'flex', alignItems: 'center', }}>
    <Checkbox.Root className="CheckboxRoot" id="c1" style={{cursor: 'pointer', width: '15px', height: '15px', borderWidth: '1px', borderRadius: "25%", paddingBottom: '2px', paddingRight: '2px'}}>
      <Checkbox.Indicator className="CheckboxIndicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
        
    <label className="Label" htmlFor="c1" style={{cursor: 'pointer'}}>
      {name}
    </label>
  </div>
);

export { CheckBox }
