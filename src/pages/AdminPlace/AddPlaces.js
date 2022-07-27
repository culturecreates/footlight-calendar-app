import { Layout, Form, Input, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import {
  FileImageOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { adminPlaces } from "../../utils/Utility";
import ServiceApi from "../../services/Service";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlace } from "../../action";


const AddPlaces = function ({ currentLang,placeDetails,isModal=false,onsuccessAdd }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactStore = useSelector((state) => state.place);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        form.setFieldsValue({
          name: address.split(",").splice(0, 1).join(""),
          addressCountry: results[0].address_components.find((item) =>
            item.types.includes("country")
          )?.long_name,
          addressLocality: results[0].address_components.find((item) =>
            item.types.includes("locality")
          )?.long_name,
          addressRegion: results[0].address_components.find(
            (item) =>
              item.types.includes("administrative_area_level_2") ||
              item.types.includes("administrative_area_level_3")
          )?.long_name,
          postalCode: results[0].address_components.find((item) =>
            item.types.includes("postal_code")
          )?.long_name,
          containedInPlace: results[0].address_components.find((item) =>
            item.types.includes("route")
          )?.long_name,

          streetAddress: results[0].formatted_address,
        });

        return getLatLng(results[0]);
      })
      .then((latLng) =>
        form.setFieldsValue({ latitude: ''+latLng.lat, longitude: ''+latLng.lng })
      )
      .catch((error) => console.error("Error", error));
  };
  const handleSubmit = (values) => {
    const postalObj = {
      addressCountry: values.addressCountry,
      addressLocality: values.addressLocality,
      addressRegion: values.addressRegion,
      postalCode: values.postalCode,
      streetAddress: values.streetAddress,
    };
    setLoading(true)
    if (placeDetails)
    ServiceApi.addPostalAddress(postalObj,placeDetails.postalAddress.uuid)
      .then((response) => {
        if (response && response.data) {
          const placeObj = {
            name: {
              
              fr: values.name,
            },
            description: {
              
              fr: values.description,
            },
            
           
            postalAddressId: {
              entityId: placeDetails.postalAddress.uuid,
            },
            containedInPlace: values.containedInPlace,
           
            geo: {
              latitude: values.latitude,
              longitude: values.longitude,
            },
            
          };
          ServiceApi.updatePlace(placeObj,placeDetails.uuid)
            .then((response) => {
                setLoading(false)
              message.success("Place Created Successfully");
              navigate(`/admin/places`);
            })
            .catch((error) => {
                setLoading(false)
            });
        }
      })
      .catch((error) => {
        setLoading(false)
      });
      else
      ServiceApi.addPostalAddress(postalObj)
      .then((response) => {
        if (response && response.data) {
          const placeObj = {
            name: {
              
              fr: values.name,
            },
            description: {
              
              fr: values.description,
            },
            
           
            postalAddressId: {
              entityId: response.data.id,
            },
            containedInPlace: values.containedInPlace,
           
            geo: {
              latitude: values.latitude,
              longitude: values.longitude,
            },
            
          };
          ServiceApi.addPlace(placeObj)
            .then((response) => {
                setLoading(false)
              message.success("Place Created Successfully");
              
              if (contactStore != null) {
                const newContact = [...contactStore,postalObj]
                dispatch(fetchPlace(newContact));
              }
              if(!isModal)
              navigate(`/admin/places`);
            else
            onsuccessAdd()
            })
            .catch((error) => {
                setLoading(false)
            });
        }
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  useEffect(() => {
    if (placeDetails) {
      setIsUpdate(true);
      form.setFieldsValue({
        name: placeDetails.name[currentLang],
        addressCountry:placeDetails.postalAddress?.addressCountry,
        addressLocality: placeDetails.postalAddress?.addressLocality,
        addressRegion:placeDetails.postalAddress?.addressRegion,
        postalCode: placeDetails.postalAddress?.postalCode,
        containedInPlace: placeDetails.containedInPlace && placeDetails.containedInPlace[currentLang],

        streetAddress: placeDetails.postalAddress?.streetAddress,
        latitude: placeDetails.latitude && ''+placeDetails.latitude.latitude,
        longitude: placeDetails.latitude && ''+placeDetails.latitude.longitude,
        description: placeDetails.description && placeDetails.description[currentLang]
      });
      
    } else
      form.setFieldsValue({
        desc: "",
      });
  }, [placeDetails]);
  return (
    <Layout className="add-event-layout">
      <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={handleSubmit}
      >
        {adminPlaces.map((item) => (
          <>
            <div className="update-select-title">{t(item.title,{ lng: currentLang })}</div>
            <Form.Item
              name={item.name}
              className="status-comment-item"
              rules={[
                {
                  required: item.required,
                  whitespace: true,
                },
              ]}
            >
              {item.type === "geo" ? (
                <PlacesAutocomplete
                  value={address}
                  onChange={handleChange}
                  onSelect={handleSelect}
                  placeholder={item.placeHolder}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              ) : item.type === "area"?
                <Input.TextArea
                  placeholder={item.placeHolder}
                  className="replace-input"
                  rows={4}
                />
                :
                <Input
                  placeholder={item.placeHolder}
                  className="replace-input"
                  
                />
              }
            </Form.Item>
          </>
        ))}

        <Form.Item className="submit-items">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={() => {
              if(isModal)
               onsuccessAdd()
              else if (isUpdate) navigate(`/admin/places`);
              else {
                form.resetFields();
               
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<CheckOutlined />}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
      {loading && <Spinner />}
    </Layout>
  );
};
export default AddPlaces;
