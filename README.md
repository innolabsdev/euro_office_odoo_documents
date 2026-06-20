# Euro-Office Documents

Edit and collaborate on office files directly inside the **Odoo Documents** app
using **Euro-Office Docs**.

This module extends the Odoo Documents app so that text documents, spreadsheets,
and presentations can be opened, created, and co-authored in real time without
leaving Odoo. It supports two co-editing modes (Fast and Strict), Track Changes,
comments, and the built-in chat of Euro-Office Docs.

- **Technical name:** `euro_office_odoo_documents`
- **Version:** 19.0.6.2.3
- **Odoo series:** 19.0
- **License:** LGPL-3
- **Author:** Innolabs.dev
- **Support:** hello@innolabs.dev

## Features

- Open and edit `docx`, `xlsx`, and `pptx` files inside Odoo Documents.
- Create new blank documents or create from templates (Create with Euro-Office).
- Real-time co-authoring (Fast / Strict modes), Track Changes, comments, chat.
- Document version management panel.
- Advanced sharing: per-user roles, internal-user access, and link access,
  enforced so that only the document owner or an administrator can change
  sharing settings.

## Requirements

- Odoo 19.0 with the **Documents** app installed.
- The **`euro_office_odoo`** module (the main Euro-Office connector) — this
  module depends on it and inherits its configuration.
- A reachable **Euro-Office Docs** server (self-hosted or cloud).

## Installation

1. Place this module in your Odoo addons path alongside `euro_office_odoo`.
2. Update the apps list and install **Euro-Office Documents**
   (`euro_office_odoo_documents`). The required dependencies (`euro_office_odoo`,
   `documents`) are installed automatically.

## Configuration

All connection settings are configured from the **main Euro-Office app**
(`euro_office_odoo`), not from this module. In Odoo go to
**Settings → Euro-Office** and configure:

- **Document Server URL** — URL of your Euro-Office Docs instance (self-hosted
  or cloud).
- **Document Server JWT Secret** — JWT is enabled by default with an
  auto-generated key; set your own to match the Euro-Office Docs config file.
- **Document Server JWT Header** — defaults to `Authorization`; change only if
  it conflicts with your setup.
- Internal request addresses — set these if Odoo and Euro-Office Docs cannot
  reach each other over public addresses.
- **Open file in the same tab** — open editors in the current tab instead of a
  new one.

## Project structure

```
__manifest__.py            Module manifest (deps, assets, data)
controllers/               HTTP routes for document handling
models/                    Documents, sharing, access, ir.attachment extensions
security/                  ir.model.access.csv
views/                     Sharing and template share views
static/src/                OWL components, document view mixins, create dialogs
static/svg/                Format and UI icons
doc/                       Documentation source
```

## License & attribution

Licensed under **LGPL-3**.

This module is a fork of `onlyoffice_odoo_documents`
(© Ascensio System SIA, LGPL-3), adapted for the Euro-Office Connector.
