import {getItemFromAsyncStorage, saveItemInAsyncStorage} from './asyncStorage';

export const getUserListFromAsyncStorage = async () => {
  const userList = await getItemFromAsyncStorage('userList');
  // @ts-ignore
  return JSON.parse(userList);
};

export const getActiveUserFromAsyncStorage = async () => {
  const activeUserIndex = await getItemFromAsyncStorage('activeUser');
  // @ts-ignore
  return JSON.parse(activeUserIndex);
};

export const saveUserListInAsyncStorage = async (userData: any) => {
  let userList = await getItemFromAsyncStorage('userList');
  try {
    if (!userList) {
      const newUserList = [];
      newUserList.push(userData);
      await saveItemInAsyncStorage('userList', JSON.stringify(newUserList));
      await saveItemInAsyncStorage('activeUser', JSON.stringify(0));
    } else {
      let olduserList = JSON.parse(userList);
      await saveItemInAsyncStorage(
        'activeUser',
        JSON.stringify(olduserList?.length),
      );
      olduserList.push(userData);
      await saveItemInAsyncStorage('userList', JSON.stringify(olduserList));
    }
  } catch (e) {
    console.log(`Error while setting key UsersList in storage`, e);
  }
};
