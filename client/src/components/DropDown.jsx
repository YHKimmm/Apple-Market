import React, { useEffect } from 'react'
import Select from 'react-select'
import styles from './DropDown.module.css'
import { useDispatch } from 'react-redux'
import { setSortItems } from '../reducer/sortSlice'

const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'cheapest', label: 'Price To Lower' },
    { value: 'expensive', label: 'Price to Higher' },
]

function DropDown({ sort, setSort }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSortItems(sort))
    }, [sort])

    switch (sort) {
        case 'popular':
            sort = options[0]
            break;
        case 'newest':
            sort = options[1]
            break;
        case 'cheapest':
            sort = options[2]
            break;
        case 'expensive':
            sort = options[3]
            break;
        default:
            sort = options[0]
    }
    const handleChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
        setSort(selectedOption.value);
    };
    console.log('sort', sort.value)

    return (
        <div className={styles.dropdown__container}>
            <Select
                value={sort}
                onChange={handleChange}
                options={options}
                styles={
                    {
                        menu: (base) => ({
                            ...base,
                            width: '100px',
                            fontSize: '12px',
                        }),
                        control: (base) => ({
                            ...base,
                            width: '140px',
                            fontSize: '12px',
                        }),
                        singleValue: (base) => ({
                            ...base,
                            fontSize: '11px',
                        }),
                    }
                }
            />
        </div>
    );
}
export default DropDown
