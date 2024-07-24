"use client"
import AsyncCreatableSelect from 'react-select/async-creatable';
import { Controller } from 'react-hook-form';
import { loadOptions } from '../actions';

const AsyncSelectBox = ({ name, control, errors, placeholder, isMulti, isSearchable }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <AsyncCreatableSelect
                            cacheOptions
                            defaultOptions
                            placeholder={placeholder}
                            id={name}
                            isMulti={isMulti}
                            noResultsText="no-info"
                            isClearable={true}
                            loadOptions={() => loadOptions()}
                            // options={options}
                            isSearchable={isSearchable}
                            controlShouldRenderValue={true}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    background: "none",
                                    padding: "5px",
                                    fontWeight: "normal",
                                    borderColor: errors?.label?.message && "red",
                                    fontSize: "0.9rem"
                                }),
                                placeholder: (base, state) => ({
                                    ...base,
                                    color: "#BDBDBD",
                                    fontSize: "1rem"
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 4,
                                colors: {
                                    ...theme.colors,
                                    primary25: "#dbeafe",
                                    primary: "#3b82f6",
                                },
                            })}
                            className={`${errors && "is-invalid"}`}
                            classNamePrefix="select"
                            errorText={true}
                            aria-invalid={errors && true}
                            aria-errormessage="name-invalid"
                            {...field}
                        />
                    )
                }}
            />

            <span className="text-red-500 text-xs">
                {errors?.value?.message}
            </span>
        </>
    )
}

export default AsyncSelectBox;
