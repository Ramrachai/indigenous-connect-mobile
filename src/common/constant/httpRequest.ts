//@ts-nocheck
import axios from 'axios';
import {makeEncryption} from './encryption';
import {withoutEncryptionApi} from '../../utils/withoutEncrytApi';

type props = {
  url?: string;
  data?: object | any;
  method?: string;
  baseURL?: string;
  isConsole?: boolean;
  mediaFile?: object | any;
  isParamsAndmediaFile?: boolean;
  isEncrypted?: boolean;
  isPostOrPutWithParams?: boolean;
  isBaseURLAndURLSame?: boolean;
};

export const httpRequest = async (params: props, cb: any) => {
  // This is the argument of calling httpRequest function
  // If you call api please check this one
  // if no loading callback function, 2nd parameter will be empty arrow func () => {}
  // const params = {
  //   url: params?.url, // required field, string type
  //   data: params?.data, // optional, ***this will be object type
  //   method: params?.method, // optional, string type
  //   baseURL: params?.baseURL, // optional, string type
  //   isConsole: true, // optional, boolean type,
  //   mediaFile: params?.mediaFile, // optional, object type,
  //   isParamsAndmediaFile: true, // optional, boolean type,
  //   isEncrypted: true, // optional, boolean type,
  //   isPostOrPutWithParams: true, // optional, boolean type,
  //   isBaseURLAndURLSame: true, // optional, boolean type,
  // };
  const cofigParam = configuration(params);

  const defualt_baseURL = axios.defaults.baseURL;
  var config = {
    method: cofigParam?.method || 'get',
    baseURL: params?.isBaseURLAndURLSame
      ? params?.url
      : params?.baseURL || defualt_baseURL,
    headers: {
      ...axios.defaults.headers,
      'Content-Type': params?.mediaFile
        ? 'multipart/form-data'
        : axios.defaults.headers['Content-Type'],
    },
  };

  if (params?.data || params?.mediaFile) {
    if (cofigParam?.method?.toUpperCase() === 'GET') {
      const processedConfig = await apiParamsProcess(params, config);
      config = processedConfig;
    } else {
      let formData = new FormData();
      const file = {
        uri: params?.mediaFile?.uri,
        name: params?.mediaFile?.fileName || params?.mediaFile?.name,
        type: params?.mediaFile?.type,
      };
      formData?.append('files', file);

      if (params?.mediaFile && params?.isParamsAndmediaFile) {
        config.url = cofigParam?.url;
        config.params = cofigParam?.data;
        config.data = params?.mediaFile ? formData : cofigParam?.data;
      } else if (params?.isPostOrPutWithParams) {
        const processedConfig = await apiParamsProcess(params, config);
        config = processedConfig;
      } else if (params?.mediaFile) {
        config.url = cofigParam?.url;
        config.data = params?.mediaFile ? formData : cofigParam?.data;
      } else {
        config.url = cofigParam?.url;
        config.data = cofigParam?.data;
        const encrypt = await makeEncryption(JSON.stringify(cofigParam?.data));
        const defualt_base = axios.defaults.baseURL;
        params?.isEncrypted &&
          console.log(
            `Encypted_Payload for==> ${
              params?.isBaseURLAndURLSame
                ? params?.url
                : params?.baseURL || defualt_base
            }${params?.url}==>`,
            encrypt,
          );
      }
    }
  } else {
    config = {
      url: params?.url,
      ...config,
    };
  }

  try {
    cb(true);
    params?.isConsole &&
      console.log('api_params/payload ==>', JSON.stringify(config, null, 2));

    const response = await axios(config);
    cb(false);
    params?.isConsole &&
      console.log('api_response ==>', JSON.stringify(response?.data, null, 2));

    if (response?.data === 0 || response?.data) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error) {
    cb(false);
    params?.isConsole &&
      console.log('error_response ==>', JSON.stringify(error, null, 2));

    return error;
  }
};

const apiParamsProcess = async (params: any, config: any) => {
  let processedConfig = {};
  const cofigParam = configuration(params);
  let modifiedParam = '';
  for (const [key, value] of Object.entries(cofigParam?.data)) {
    modifiedParam += `${key}=${value}&`;
  }
  if (
    withoutEncryptionApi.some(element => cofigParam?.url?.includes(element))
  ) {
    processedConfig = {
      url: cofigParam?.url,
      params: cofigParam?.data,
      ...config,
    };
  } else {
    if (params?.isEncrypted) {
      const encrypt = await makeEncryption(`${modifiedParam?.slice(0, -1)}`);
      const defualt_baseURL = axios.defaults.baseURL;
      console.log(
        `Encypted_Params for==> ${
          params?.isBaseURLAndURLSame
            ? params?.url
            : params?.baseURL || defualt_baseURL
        }${params?.url}?${encrypt}`,
      );
    }
    processedConfig = {
      url: `${cofigParam?.url}?${modifiedParam?.slice(0, -1)}`,
      ...config,
    };
  }
  return processedConfig;
};

const configuration = (param: any) => {
  if (param?.url && (param?.data || param?.mediaFile) && param?.method) {
    return {
      url: param?.url,
      data: param?.data,
      method: param?.method,
    };
  } else if (param?.url && param?.data) {
    return {
      url: param?.url,
      data: param?.data,
      method: 'get',
    };
  } else {
    return {
      url: param?.url,
      method: 'get',
    };
  }
};
