import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';

import { mapStaticDataKeys } from '../../files-metadata/pure/files-metadata.pure';

export const contactsMapper = (contacts: Contacts[], suppliers: Suppliers[]) =>
  contacts.map(contact => ({
    ...contact,
    supplier: mapStaticDataKeys(suppliers, contact.supplier)
  }));
