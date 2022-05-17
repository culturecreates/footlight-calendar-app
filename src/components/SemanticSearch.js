import React, { useState } from "react";
import { Input, AutoComplete } from 'antd';
import PropTypes from "prop-types";
import "./SemanticSearch.css";
import { useCallback } from "react";
import _debounce from 'lodash/debounce';
import ServiceApi from "../services/Service";

const SemanticSearch = function ({ onSelection, value }) {
    const [options, setOptions] = useState([]);

    
    const renderTitle = (title) => (
        <span className="search-title">
          {title}
        </span>
      );
      
      const renderItem = (title,) => ({
        value: title,
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
                        const obj=renderItem(item.name.en)
                        return obj
                      })
                  },
                  {
                    label: renderTitle('organizations'),
                    options: events.organizations.map(item=>{
                        const obj=renderItem(item.name.en)
                        return obj
                      })
                  },
                  {
                    label: renderTitle('places'),
                    options: events.places.map(item=>{
                        const obj=renderItem(item.name.en)
                        return obj
                      })
                  },
                  {
                    label: renderTitle('types'),
                    options: events.types.map(item=>{
                        const obj=renderItem(item.name.en)
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
       debounceFn(value)
    };
    const debounceFn = useCallback(_debounce(searchResult, 1000), []);
    const onSelect = (value) => {
      console.log('onSelect', value);
    };
    const handleKeyPress = (ev) => {
        console.log('handleKeyPress', ev.target.value);
      };
  return (
    <div className="semantic-search-div">
      <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      onKeyPress={handleKeyPress}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
    </div>
  );
};
export default SemanticSearch;

SemanticSearch.propTypes = {
  onClose: PropTypes.func,
};
