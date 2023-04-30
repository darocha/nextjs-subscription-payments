import Header from '@/components/Header';
import { AddressType } from '@/types';
import { Box, IconButton, useTheme } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useAtom } from 'jotai';
import { addressAtom, addressModalAtom, addressesAtom } from '@/atoms/address';
import AppModal from '@/components/modal';
import AddressForm from './form';
import AddressActions from './actions';
import { addressApi } from '@/pages/api/addresses';
import { tokens } from '@/theme';

type Props = {
  user: any;
};

export const AddressList: FC<Props> = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setModalOpen] = useAtom(addressModalAtom);
  const [addresses, setAddresses] = useAtom(addressesAtom);
  const [address, setAddress] = useAtom(addressAtom);

  const openModal = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
    setAddress(null);
  };

  const editAddress = (address: AddressType) => {
    setAddress(address);
    openModal();
  };

  const onSubmit = () => {
    setModalOpen(false);
    setAddress(null);
  };

  const deleteAddress = (id: number) => {
    const updatedAddresses = addresses?.filter((a) => a.id !== id);
    setAddresses([...(updatedAddresses || [])]);
    addressApi.deleteAddress(id);
  };

  const setDefaultBilling = async (id: number) => {
    await addressApi.setDefaultBilling(id);
    const addressesArr = await addressApi.getAddresses(user.id);
    setAddresses([...(addressesArr || [])]);
  };

  const setDefaultShipping = async (id: number) => {
    await addressApi.setDefaultShipping(id);
    const addressesArr = await addressApi.getAddresses(user.id);
    setAddresses([...(addressesArr || [])]);
  };

  const isDefaultBilling = (address: AddressType) => {
    return !!address.isDefault && !!address.isBilling;
  };

  const isDefaultShipping = (address: AddressType) => {
    return !!address.isDefault && address.isBilling === false;
  };
  return (
    <>
      <Box
        className="dashboard-box"
        sx={{ background: colors.dashboard.window.background }}
      >
        <Box className="dashboard-box-header">
          <Header
            title="Your Addresses"
            subtitle="Manage your billing and shipping addresses"
            variant="h4"
            subtitleVariant="h6"
            fontWeight="normal"
          />

          <div className="dashboard-circle-button m-5 absolute">
            <IconButton onClick={openModal} type="button" sx={{ p: 1 }}>
              <AddIcon />
            </IconButton>
          </div>
        </Box>
        <Box className="dashboard-box-body">
          {addresses &&
            addresses
              .filter((a) => isDefaultBilling(a))
              .map((address, i) => (
                <Address
                  address={address}
                  editAddress={editAddress}
                  setDefaultBilling={setDefaultBilling}
                  setDefaultShipping={setDefaultShipping}
                  deleteAddress={deleteAddress}
                  isDefaultBilling={isDefaultBilling}
                  isDefaultShipping={isDefaultShipping}
                />
              ))}
          {addresses &&
            addresses
              .filter((a) => isDefaultShipping(a))
              .map((address, i) => (
                <Address
                  address={address}
                  editAddress={editAddress}
                  setDefaultBilling={setDefaultBilling}
                  setDefaultShipping={setDefaultShipping}
                  deleteAddress={deleteAddress}
                  isDefaultBilling={isDefaultBilling}
                  isDefaultShipping={isDefaultShipping}
                />
              ))}
          {addresses &&
            addresses
              .filter((a) => !isDefaultShipping(a) && !isDefaultBilling(a))
              .map((address, i) => {
                return (
                  <Address
                    address={address}
                    editAddress={editAddress}
                    setDefaultBilling={setDefaultBilling}
                    setDefaultShipping={setDefaultShipping}
                    deleteAddress={deleteAddress}
                    isDefaultBilling={isDefaultBilling}
                    isDefaultShipping={isDefaultShipping}
                  />
                );
              })}

          {!addresses ||
            (addresses.length === 0 && (
              <div className="flex text-center p-50 py-[50px] w-full justify-center">
                <div>There are no addresses here</div>
              </div>
            ))}
        </Box>
      </Box>
      <AppModal onClose={onClose} open={open}>
        <AddressForm
          onSubmit={onSubmit}
          onClose={onClose}
          address={address}
          user={user}
        />
      </AppModal>
    </>
  );
};

type AddressProps = {
  address: AddressType;
  editAddress: (address: AddressType) => void;
  setDefaultBilling: (id: number) => Promise<void>;
  setDefaultShipping: (id: number) => Promise<void>;
  deleteAddress: (id: number) => void;
  isDefaultBilling: (address: AddressType) => boolean;
  isDefaultShipping: (address: AddressType) => boolean;
};
const Address: FC<AddressProps> = ({
  address,
  editAddress,
  setDefaultBilling,
  setDefaultShipping,
  deleteAddress,
  isDefaultBilling,
  isDefaultShipping
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      className="dashboard-list-item"
      sx={{ background: colors.dashboard.listItem.background }}
    >
      <div>
        <div className="px-2 opacity-30">
          {isDefaultBilling(address)
            ? 'Default Billing Address'
            : isDefaultShipping(address)
            ? 'Default Shipping Address'
            : ''}
        </div>
        <div className="px-2">
          {address.firstName} {address.lastName}
        </div>
        <div className="px-2">
          {' '}
          {address.line1} {address.line2}
        </div>
        <div className="px-2">
          {address.city} {address.state} {address.zipCode}
        </div>
      </div>
      <div className="dashboard-circle-button">
        <AddressActions
          address={address}
          edit={editAddress}
          setDefaultBilling={setDefaultBilling}
          setDefaultShipping={setDefaultShipping}
          deleteAddress={deleteAddress}
        />
      </div>
    </Box>
  );
};
