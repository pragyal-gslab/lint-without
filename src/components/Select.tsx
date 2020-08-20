import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Select as MUSelect, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: (props: Props) => props.width || 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  disabled?: boolean;
  displayEmpty?: boolean;
  displayKey?: string | null;
  error?: boolean;
  helperText?: string | null;
  id?: string;
  items: Array<any>;
  label?: string | null;
  labelId?: string;
  multiple?: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  placeholder?: string | null;
  required?: boolean;
  shrink?: boolean;
  value: string | number | object | Array<any> | null;
  valueKey?: string | null;
  width?: string;
}

const Select: React.FC<Props> = ({
  disabled,
  displayEmpty,
  displayKey,
  error,
  helperText,
  id,
  items,
  label,
  labelId,
  multiple,
  onChange,
  placeholder,
  required,
  shrink,
  value,
  valueKey,
  width,
}) => {
  const selectClasses = useStyles({ width, items, onChange, value });

  const getlabelId = React.useMemo(
    () => `mu-select-label-${Math.floor(Math.random() * 1000)}`,
    []
  );

  const getId = React.useMemo(
    () => `mu-select-${Math.floor(Math.random() * 1000)}`,
    []
  );

  const isChecked = React.useCallback(
    (item) => {
      if (Array.isArray(value)) {
        if (!displayKey) {
          return value.indexOf(item) > -1;
        } else if (displayKey) {
          if (!valueKey) {
            return (
              value.findIndex(
                (val: any) => val && val[displayKey] === item[displayKey]
              ) > -1
            );
          } else {
            return value.findIndex((val: any) => val === item[valueKey]) > -1;
          }
        }
      }
    },
    [displayKey, value, valueKey]
  );

  const menuItems = React.useMemo(() => {
    // console.log("menuItems called.", items);
    if (items.length && typeof items[0] === "string") {
      return items.map((item) => (
        <MenuItem key={item} value={item}>
          {multiple && <Checkbox checked={isChecked(item)} />}
          {item}
        </MenuItem>
      ));
    } else {
      return items.map((item, index) => (
        <MenuItem key={index} value={valueKey ? item[valueKey] : item}>
          {multiple && <Checkbox checked={isChecked(item)} />}
          {displayKey ? item[displayKey] : item}
        </MenuItem>
      ));
    }
  }, [displayKey, isChecked, items, multiple, valueKey]);

  const getValueIndex = React.useCallback(
    (value: any) => {
      return items.findIndex((item) => item.value === value.value);
    },
    [items]
  );

  const getMultiValues = React.useCallback(() => {
    if (!displayKey) {
      return items;
    } else {
      if (Array.isArray(value)) {
        let selectValue: any = [];
        value.forEach((val) => {
          for (let item of items) {
            if (valueKey && item[valueKey] === val) {
              selectValue.push(item);
            } else if (item[displayKey] === val[displayKey]) {
              selectValue.push(item);
            }
          }
        });
        return selectValue;
      }
    }
  }, [displayKey, items, value, valueKey]);

  const getValue = React.useCallback(() => {
    if (!displayKey) {
      return value;
    } else {
      if (valueKey) {
        return value;
      } else {
        return !multiple
          ? value
            ? items[getValueIndex(value)]
            : ""
          : getMultiValues();
      }
    }
  }, [
    displayKey,
    value,
    valueKey,
    multiple,
    items,
    getValueIndex,
    getMultiValues,
  ]);

  const getRenderValue = React.useCallback(
    (selected) => {
      if (!displayKey) {
        return selected.join(", ");
      } else {
        if (!valueKey) {
          return selected
            .reduce((a: string, b: any) => `${a} ${b[displayKey]},`, "")
            .slice(0, -1);
        } else {
          const disArr = items.filter((item) =>
            selected.includes(item[valueKey])
          );
          return disArr
            .reduce((a: string, b: any) => `${a} ${b[displayKey]},`, "")
            .slice(0, -1);
        }
      }
    },
    [displayKey, items, valueKey]
  );

  return (
    <>
      <ErrorBoundary message="Something is missing.">
        <FormControl
          required={required}
          disabled={disabled}
          className={selectClasses.formControl}
          error={error}
        >
          {label && (
            <InputLabel shrink={shrink} id={labelId ? labelId : getlabelId}>
              {label}
            </InputLabel>
          )}
          <MUSelect
            labelId={labelId}
            id={id ? id : getId}
            value={getValue()}
            onChange={onChange}
            displayEmpty={displayEmpty}
            multiple={multiple}
            renderValue={
              multiple ? (selected) => getRenderValue(selected) : undefined
            }
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {menuItems}
          </MUSelect>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </ErrorBoundary>
    </>
  );
};

Select.defaultProps = {
  disabled: false,
  displayEmpty: false,
  displayKey: "texts",
  error: false,
  helperText: null,
  id: "id",
  items: [],
  label: null,
  labelId: "labelId",
  multiple: false,
  onChange: () => null,
  placeholder: null,
  required: false,
  valueKey: null,
  width: "120",
};

Select.propTypes = {
  disabled: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  displayKey: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  shrink: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  valueKey: PropTypes.string,
  width: PropTypes.string,
};

export default React.memo(Select);
