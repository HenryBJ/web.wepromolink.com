import Breadcrumb from "../../components/Breadcrumb";
import GenericForm, { FormItem } from "../../components/GenericForm";
import { IBankAccount, IPaymentMethod } from "../../interfaces/ViewModels";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SelectCombo from "../../components/SelectCombo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBtc, faStripe } from "@fortawesome/free-brands-svg-icons";
import {
  connectStripe,
  getBillingData,
  verifyBTCAddress,
} from "../../services";
import useVisit from "../../hooks/Visit";
import AccountVerified from "../../components/AccountVerified";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { IOption } from "../../interfaces/Common";

const billingIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
    />
  </svg>
);

const WireIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-orange-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
    />
  </svg>
);

const optionsInitials: IOption[] = [
  // { id: 1, name: 'Bitcoin', icon: <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" />, selected: true },
  // { id: 3, name: 'Stripe', icon: <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />, selected: false },
  { id: 1, name: "", icon: <Spinner />, selected: true },
];

export default function Index() {
  const [loading, setLoading] = useState("");
  const [data, setData] = useState<IPaymentMethod[]>();
  const [options, setOptions] = useState<IOption[]>(optionsInitials);
  const [method, setMethod] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  
  const [bankAccoundId, setBankAccoundId] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState<string>();
  const [bankCountryCode, setBankCountryCode] = useState<string>();
  const [bankCurrency, setBankCurrency] = useState<string>();
  const [bankHolderName, setBankHolderName] = useState<string>();
  const [bankRouting, setBankRouting] = useState();
  const [bankAccountType, setBankAccountType] = useState<string>('individual');

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigation = useNavigate();

  useVisit("visit_billing");

  const handleChange = (newMethod: string) => {
    setMethod(newMethod);
    let isV = data?.find((e) => e.name.toLowerCase() === newMethod)?.isVerified;
    setIsVerified(isV ?? false);
  };

  const getButtonName = (): string => {
    if (method === "stripe") {
      if (isVerified) {
        return "Update Stripe";
      } else {
        return "Connect with Stripe";
      }
    }
    
    if (method === "bitcoin" && !isVerified) return "Validate Address";
    
    if (method === "wire transfer") {
        if (isVerified) {
          return "Update";
        } else if(bankAccoundId){
          return "Verify Account";
        } else return "Enter"
      }
    return "Back";
  };

  const handleData = (data: IPaymentMethod[]) => {
    let list: IOption[] = data.map(
      (e: IPaymentMethod, i): IOption => ({
        id: i,
        name: e.name.toLowerCase(),
        selected: i === 0,
        // icon: e.name.toLowerCase() === 'bitcoin' ? <FontAwesomeIcon icon={faBtc} className="text-xl text-yellow-500" /> : <FontAwesomeIcon icon={faStripe} className="text-xl text-blue-600" />
        icon:
          e.name.toLowerCase() === "wire transfer" ? (
            WireIcon
          ) : (
            <FontAwesomeIcon
              icon={faStripe}
              className="text-xl text-blue-600"
            />
          ),
      })
    );

    setMethod(list[0].name);
    setOptions(list);
    setData(data);
    setIsVerified(data[0].isVerified);
    setBtcAddress(
      data?.find((e) => e.name.toLowerCase() === "bitcoin")?.value ?? ""
    );
    setBankAccoundId(
        data?.find((e) => e.name.toLowerCase() === "wire transfer")?.value ?? ""
      );
    
  };

  useEffect(() => {
    setLoading("Getting billing data ...");
    getBillingData()
      .then((res) => {
        handleData(res.data);
      })
      .finally(() => setLoading(""));
  }, []);

  const OpenLink = (link: string) => {
    const newWindow = window.open(link, "_self");
    if (newWindow) {
      newWindow.onload = () => setLoading("");
      newWindow.onerror = () => setLoading("");
      newWindow.onabort = () => setLoading("");
    }
  };

  const handleChangeBTCAddress = (address: string) => {
    // If it is the same address set the same verification state
    if (
      address === data?.find((e) => e.name.toLowerCase() === "bitcoin")?.value
    ) {
      setIsVerified(
        data?.find((e) => e.name.toLowerCase() === "bitcoin")?.isVerified ??
          false
      );
    } else {
      setIsVerified(false);
    }
    setBtcAddress(address);
  };

  const handleOnValidateAddress = (data: IPaymentMethod) => {
    setLoading("Validating Bitcoin Address");
    verifyBTCAddress(data.value ?? "")
      .then((res) => {
        if (res.data) {
          setIsVerified(true);
          setData((prev) =>
            prev?.map((item) => {
              if (item.name.toLowerCase() === "bitcoin") {
                return { ...item, value: data.value, isVerified: true };
              }
              return item;
            })
          );
          toast.success(
            "Bitcoin Address is Valid, your Bitcoin Billing Information is verified now"
          );
        } else {
          toast.warning("Bitcoin Address is NOT Valid");
        }
      })
      .finally(() => setLoading(""));
  };

  
  const handleOnValidateBank = (data: IPaymentMethod) => {
    if(!bankAccountNumber || !bankHolderName || !bankCurrency || !bankCountryCode){
        toast.warn('There are some empty data');
        return;
    }

    setLoading("Verifing Bank Account");
    let info:IBankAccount = {
        holder:bankHolderName,
        accountCurrency:bankCurrency,
        accountNumber:bankAccountNumber,
        accountType:bankAccountType,
        countryCode:bankCountryCode,
        routingNumber:bankRouting
    };
    // verifyBankAccount(data.value ?? "")
    //   .then((res) => {
    //     if (res.data) {
    //       setIsVerified(true);
    //       setData((prev) =>
    //         prev?.map((item) => {
    //           if (item.name.toLowerCase() === "bitcoin") {
    //             return { ...item, value: data.value, isVerified: true };
    //           }
    //           return item;
    //         })
    //       );
    //       toast.success(
    //         "Bitcoin Address is Valid, your Bitcoin Billing Information is verified now"
    //       );
    //     } else {
    //       toast.warning("Bitcoin Address is NOT Valid");
    //     }
    //   })
    //   .finally(() => setLoading(""));
  };


  const handleOnUpdateBank = (data: IPaymentMethod) => {
    // setLoading("Updating Bank Account");
    // updateBankAccount()
    //   .then((res) => OpenLink(res.data))
    //   .catch((_) => {
    //     toast.warning("Unable to update bank account");
    //     setLoading("");
    //   });
  };



  const handleOnUpdateStripe = (data: IPaymentMethod) => {
    setLoading("Updating Stripe");
    connectStripe()
      .then((res) => OpenLink(res.data))
      .catch((_) => {
        toast.warning("Unable to connect to Stripe");
        setLoading("");
      });
  };

  const handleOnUpdateBTC = (data: IPaymentMethod) => {
    navigation(-1);
  };

  const handleOnConnectStripe = (data: IPaymentMethod) => {
    setLoading("Connecting to Stripe");
    connectStripe()
      .then((res) => OpenLink(res.data))
      .catch((_) => {
        toast.warning("Unable to connect to Stripe");
        setLoading("");
      });
  };

  const onSubmit = (): ((data: IPaymentMethod) => void) => {
    console.log("onSubmit");
    if (method === "stripe") {
      if (isVerified) {
        return (data: IPaymentMethod) => handleOnUpdateStripe(data);
      } else {
        return (data: IPaymentMethod) => handleOnConnectStripe(data);
      }
    } else if (method === "bitcoin") {
      if (isVerified) {
        return (data: IPaymentMethod) => handleOnUpdateBTC(data);
      } else {
        return (data: IPaymentMethod) => handleOnValidateAddress(data);
      }
    } else if (method === "wire transfer") {
        if (isVerified) {
          return (data: IPaymentMethod) => handleOnUpdateBank(data);
        } else {
          return (data: IPaymentMethod) => handleOnValidateBank(data);
        }
      }
    return (d) => console.log(d);
  };

  let schema = yup
    .object({
      name: yup.string().trim().required(),
      value: yup.string().when("name", {
        is: (val: string) => val === "bitcoin",
        then: yup
          .string()
          .matches(
            /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
            "The Bitcoin address is invalid"
          )
          .required("Bitcoin address is required"),
        otherwise: yup.string(),
      }),
      isVerified: yup.bool(),
      bankAccount: yup.string().trim(),
      bankCountryCode: yup.string().trim(),
      bankCurrency: yup.string().trim(),
      bankHolderName: yup.string().trim(),
      bankRouting: yup.string().trim(),
      bankAccountType: yup.string().trim(),
    })
    .required();

  return (
    <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-center items-center">
      <Breadcrumb
        levels={[
          { icon: billingIcon, title: "Billing", link: "/billing" },
          { title: "Billing Information", link: "" },
        ]}
      />
      <GenericForm
        schema={schema}
        title="Billing Information"
        onSubmit={onSubmit()}
        buttonTitle={getButtonName()}
        back={true}
        initialValue={data}
      >
        <FormItem field="name" helpTip="Payment method">
          {({ setValue }) => (
            <SelectCombo
              onChange={(value) => {
                setValue("name", value);
                handleChange(value);
              }}
              items={options}
            />
          )}
        </FormItem>

        <FormItem field="isVerified">
          {() => {
            if (loading) {
              return <Spinner />;
            }
            return (
              <AccountVerified
                isVerified={isVerified}
                extra={
                  method === "bitcoin"
                    ? "You must provide a valid, owned, and previously used Bitcoin address for it to be validated."
                    : method === "wire transfer"
                    ? "Enter your bank account information"
                    : "Click on the button to create a connected Stripe account and proceed with the validation."
                }
              />
            );
          }}
        </FormItem>

        {method === "bitcoin" ? (
          <FormItem field="value" helpTip="Bitcoin Address">
            {({ setValue }) => (
              <input
                value={btcAddress}
                onChange={(value) => {
                  setValue("value", value.target.value);
                  handleChangeBTCAddress(value.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength={120}
                placeholder="Bitcoin Address"
                type="text"
              />
            )}
          </FormItem>
        ) : (
          []
        )}

        {method === "wire transfer" ? (
          <FormItem
            field="value"
            helpTip="Bank Account Holder Name: The name of the person or business that owns the bank account"
          >
            {({ setValue }) => (
              <input
                value={bankHolderName}
                onChange={(value) => {
                  setValue("bankHolderName", value.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength={120}
                placeholder="Account Holder Name"
                type="text"
              />
            )}
          </FormItem>
        ) : (
          []
        )}

        {method === "wire transfer" ? (
          <FormItem field="value" helpTip="Bank Account Number">
            {({ setValue }) => (
              <input
                value={bankAccountNumber}
                onChange={(value) => {
                  setValue("bankAccount", value.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength={120}
                placeholder="Account Number"
                type="text"
              />
            )}
          </FormItem>
        ) : (
          []
        )}

        {method === "wire transfer" ? (
          <FormItem
            field="value"
            helpTip="Bank Country Code (us) - Bank Account Currency (usd)"
          >
            {({ setValue }) => (
              <div className="flex gap-2 w-full">
                <input
                  value={bankCountryCode}
                  onChange={(value) => {
                    setValue("bankCountryCode", value.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  maxLength={120}
                  placeholder="Country Code"
                  type="text"
                />
                <input
                  value={bankCurrency}
                  onChange={(value) => {
                    setValue("bankCurrency", value.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  maxLength={120}
                  placeholder="Account Currency"
                  type="text"
                />
              </div>
            )}
          </FormItem>
        ) : (
          []
        )}

        {method === "wire transfer" ? (
          <FormItem
            field="value"
            helpTip="Bank Routing Number:The routing number, sort code, or other country-appropriate institution number for the bank account. For US bank accounts, this is required and should be the ACH routing number, not the wire routing number. If you are providing an IBAN for Bank Account Number, this field is not required."
          >
            {({ setValue }) => (
              <input
                value={bankRouting}
                onChange={(value) => {
                  setValue("bankRouting", value.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength={120}
                placeholder="Routing Number"
                type="text"
              />
            )}
          </FormItem>
        ) : (
          []
        )}

        {method === "wire transfer" ? (
          <FormItem field="value" helpTip="Type of Bank Account">
            {({ setValue }) => (
              <div className="flex gap-5 items-center justify-center w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <label className="flex gap-2 items-center justify-center text-gray-700">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    radioGroup="accountType"
                    value="company"
                    checked={bankAccountType === "company"}
                    onChange={(e) =>{
                      setValue("bankAccountType", e.target.value)
                      setBankAccountType('company');}
                    }
                  />
                  Company
                </label>
                <label className="flex gap-2 items-center justify-center text-gray-700">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    radioGroup="accountType"
                    value="individual"
                    checked={bankAccountType === "individual"}
                    onChange={(e) =>{
                      setValue("bankAccountType", e.target.value)
                      setBankAccountType('individual');}
                    }
                  />
                  Individual
                </label>
              </div>
            )}
          </FormItem>
        ) : (
          []
        )}
      </GenericForm>
      {loading && <Loader text={loading} />}
    </section>
  );
}
