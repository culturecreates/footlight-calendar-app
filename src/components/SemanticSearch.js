import React, { useState } from "react";
import { Input, AutoComplete } from 'antd';
import PropTypes from "prop-types";
import "./SemanticSearch.css";
import { useCallback } from "react";
import _debounce from 'lodash/debounce';
import ServiceApi from "../services/Service";
import { useTranslation, Trans } from "react-i18next";

const SemanticSearch = function ({ onSelection, onClearSearch,currentLang }) {
    const [options, setOptions] = useState([]);

    const { t, i18n } = useTranslation();
    const renderTitle = (title) => (
        <span className="search-title">
          {title}
        </span>
      );
      
      const renderItem = (title,types,uuid="") => ({
        value: title,
        options:types,
        key: types === "places"?uuid:title,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {title}
            
          </div>
        ),
      });
    const searchResult = (query) =>{
        
        ServiceApi.searchSuggesion(query)
        .then((response) => {
          if (response && response.data && response.data.data) {
            const events = response.data.data;
            const array=[
                {
                    label: renderTitle('audiences'),
                    options: events.audiences.map(item=>{
                        const obj=renderItem(item.name[currentLang],"audiences")
                        return obj
                      })
                  },
                  {
                    label: renderTitle('organizations'),
                    options: events.organizations.map(item=>{
                        const obj=renderItem(item.name[currentLang],"organizations")
                        return obj
                      })
                  },
                  {
                    label: renderTitle('places'),
                    options: events.places.map(item=>{
                        const obj=renderItem(item.name[currentLang],"places",item.uuid)
                        return obj
                      })
                  },
                  {
                    label: renderTitle('types'),
                    options: events.types.map(item=>{
                        const obj=renderItem(item.name[currentLang],"types")
                        return obj
                      })
                  },
               
            ]
           
            setOptions(array.filter(item=>item.options.length!==0))
            
          }
        })
        .catch((error) => {
        });
    }
    const handleSearch = (value) => {
      console.log(value)
      if(value.length === 0)
       onClearSearch()
      else 
       debounceFn(value)
    };
    const debounceFn = useCallback(_debounce(searchResult, 1000), []);
    const onSelect = (value,options) => {
      const selectObj = {
        type: options.options,
        name: options.key,
      };
      onSelection(selectObj)
    };
    const handleKeyPress = (ev) => {
      const selectObj = {
        type: "queryString",
        name: ev.target.value,
      };
      console.log(ev.key)
      if (ev.key === "Enter")
      onSelection(selectObj)
      };
  return (
    <div className="semantic-search-div">
      <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 400,
      }}
      options={options}
      onSelect={(val, option) => onSelect(val, option)}
      onSearch={handleSearch}
      onKeyPress={handleKeyPress}
      
      
    >
      <Input.Search allowClear size="large" placeholder={t("Search")} onClear={onClearSearch}/>
    </AutoComplete>
    </div>
  );
};
export default SemanticSearch;

SemanticSearch.propTypes = {
  onClose: PropTypes.func,
};
