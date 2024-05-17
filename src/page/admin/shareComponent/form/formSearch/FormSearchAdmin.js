import { Icon } from "assets/icon";
import React from "react";

const FormSearchAdmin = ({ children, method, submitForm, buttons = [] }) => {
  const { handleSubmit } = method;

  const handleSubmitForm = (data) => {
    console.log('data', data);
    submitForm(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="p-[10px] rounded-[10px] h-full relative"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        border: "1px solid #cbcbcb",
      }}
    >
      <div className="grid grid-cols-6 gap-[20px]">
        {children}
      </div>
      {
        buttons?.length  > 0
        &&
        <div className="ml-[10px] absolute bottom-[-10px] right-2 bg-[#001529] rounded-[20px] py-[5px] px-[10px] flex items-center text-white">
            {
              buttons.map((btn, index) => {
                  switch(btn) {
                    case 'save': return <button className="ml-[20px]">
                        <Icon name="save"/>
                      </button>;
                    case 'find': return <button type="submit" className="ml-[20px]">
                        <Icon name="search"/>
                      </button>;
                    case 'excel': return <button className="ml-[20px]">
                        <Icon name="file"/>
                      </button>;
                    case 'add': return <button className="ml-[20px]">
                        <Icon name="insert"/>
                      </button>;
                  }    
              })
            }
        </div>

      }
      <div className=""></div>
    </form>
  );
};

export default FormSearchAdmin;
