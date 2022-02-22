import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const DropDownButtonComponent = (props) => {
    const { name, listItem, handleChange } = props;

    const handleChangeSelect = (id, event) => {
        handleChange({ id, name: event.target.value })
    }
    return (
        <>
            <DropdownButton variant="info" id="dropdown-item-button" title={name || 'Position'}
                onSelect={handleChangeSelect}>
                {listItem && listItem.length > 0 && listItem.map((item, index) => {
                    return (
                        <Dropdown.Item as="button" key={item.id} eventKey={item.id} value={item.name}
                        >{item.name}</Dropdown.Item>
                    )
                })}
            </DropdownButton>

        </>
    )
}

export default DropDownButtonComponent