import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { settingAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import CloseIcon from "@material-ui/icons/Close";

class ApprovalWorkFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workFlowData: {
      //   "purchaseRequisition": [
      //     {
      //       "type": "quis",
      //       "id": 1,
      //       "userName": "Jarret",
      //       "userEmail": "Jacynthe_Kovacek25@gmail.com",
      // "userId":1,
      //       "location": [
      //         "Laury Orchard Ohio,91918 Antigua and Barbuda",
      //         "Kozey Inlet Massachusetts,68269-6164 Monaco",
      //         "Cronin Creek Kansas,79657 Qatar"
      //       ],
      //       "baseLine": {
      //         "type": "saepe magnam dolorem",
      //         "value": 594
      //       }
      //     },
      //     {
      //       "type": "eum",
      //       "id": 2,
      //       "userName": "Abelardo Douglas",
      //       "userEmail": "Martin_Mann39@hotmail.com",
      //       "location": [
      //         "Mueller Inlet Missouri,76600-6298 Zimbabwe",
      //         "Thora Crossing South Dakota,10974-8422 Switzerland",
      //         "Harvey Views Minnesota,54375 New Zealand"
      //       ],
      //       "baseLine": {
      //         "type": "aspernatur ex quas",
      //         "value": 944
      //       }
      //     },
      //     {
      //       "type": "quam",
      //       "id": 3,
      //       "userName": "Sydnee Jacobs",
      //       "userEmail": "Brent.Wolff35@yahoo.com",
      //       "location": [
      //         "Gutkowski Isle Rhode Island,89645-1864 Reunion",
      //         "Vandervort Harbors Rhode Island,24701 Bosnia and Herzegovina",
      //         "Jamir Grove Connecticut,95047-9857 Guernsey"
      //       ],
      //       "baseLine": {
      //         "type": "aut ut magni",
      //         "value": 453
      //       }
      //     }
      //   ],
      //   "purchaseOrder": [
      //     {
      //       "type": "sint",
      //       "id": 4,
      //       "userName": "Thalia Powlowski",
      //       "userEmail": "Gregory99@gmail.com",
      //       "userId":2,
      //       "location": [
      //         "Kohler Rue Mississippi,05294 Afghanistan",
      //         "Reta Turnpike Oklahoma,05227-7473 Paraguay",
      //         "Madilyn Shoals Rhode Island,30843-9703 Northern Mariana Islands"
      //       ],
      //       "baseLine": {
      //         "type": "aut sed deserunt",
      //         "value": 222
      //       }
      //     },
      //     {
      //       "type": "velit",
      //       "id": 5,
      //       "userName": "Jamar Turner",
      //       "userEmail": "Eldred90@gmail.com",
      //       "location": [
      //         "Hermann Creek Illinois,80310-7691 Comoros",
      //         "Amir Village Wisconsin,80199 Iran",
      //         "Bergnaum Springs Delaware,25862-0313 Monaco"
      //       ],
      //       "baseLine": {
      //         "type": "repellendus reprehenderit voluptatem",
      //         "value": 570
      //       }
      //     },
      //     {
      //       "type": "ut",
      //       "id": 6,
      //       "userName": "Larue Mraz",
      //       "userEmail": "Mara45@hotmail.com",
      //       "location": [
      //         "Emard Harbor New Mexico,59064 Guam",
      //         "Kuhn Junctions North Dakota,29410-2651 Philippines",
      //         "Henry Divide Louisiana,65506 Myanmar"
      //       ],
      //       "baseLine": {
      //         "type": "facilis incidunt eos",
      //         "value": 479
      //       }
      //     }
      //   ],
      //   "invoice": [
      //     {
      //       "type": "alias",
      //       "id": 7,
      //       "userName": "Susanna Vandervort",
      //       "userEmail": "Krista.Schuster@yahoo.com",
      //       "location": [
      //         "Green Harbor Missouri,01678-8612 Tanzania",
      //         "Kelli Plains Oregon,26766 Tokelau",
      //         "Hartmann Glens Hawaii,34686-4660 India"
      //       ],
      //       "baseLine": {
      //         "type": "sunt consequuntur nobis",
      //         "value": 373
      //       }
      //     },
      //     {
      //       "type": "corporis",
      //       "id": 8,
      //       "userName": "Marlon Towne",
      //       "userEmail": "Jerod33@hotmail.com",
      //       "location": [
      //         "Berniece Crest West Virginia,18633-2122 Congo",
      //         "Champlin Stream North Carolina,26914-5329 Czech Republic",
      //         "Evans Flats Pennsylvania,85901-8828 Slovenia"
      //       ],
      //       "baseLine": {
      //         "type": "totam officia deleniti",
      //         "value": 383
      //       }
      //     },
      //     {
      //       "type": "fugiat",
      //       "id": 9,
      //       "userName": "Irving Kuhlman",
      //       "userEmail": "Malinda3@yahoo.com",
      //       "location": [
      //         "Sabina Junction Alaska,17753 Nicaragua",
      //         "Leannon Ford New Hampshire,05758 Myanmar",
      //         "Konopelski Land Virginia,81496-9632 Canada"
      //       ],
      //       "baseLine": {
      //         "type": "iure tempora earum",
      //         "value": 367
      //       }
      //     }
      //   ],
      //   "payments": [
      //     {
      //       "type": "id",
      //       "id": 10,
      //       "userName": "Maynard Pagac",
      //       "userEmail": "Monroe55@hotmail.com",
      //       "location": [
      //         "Weissnat Passage New York,37930 Nicaragua",
      //         "Prohaska Loaf California,24331-0499 Turkmenistan",
      //         "Linwood Stream Missouri,05610-1590 Macedonia"
      //       ],
      //       "baseLine": {
      //         "type": "facere porro quod",
      //         "value": 430
      //       }
      //     },
      //     {
      //       "type": "voluptatem",
      //       "id": 11,
      //       "userName": "Otha Little",
      //       "userEmail": "Lawrence.Schinner53@hotmail.com",
      //       "location": [
      //         "Murphy Spur Minnesota,69705 Maldives",
      //         "Schumm Falls New Hampshire,53383-7972 Faroe Islands",
      //         "Sydni Greens Tennessee,59168 Bahrain"
      //       ],
      //       "baseLine": {
      //         "type": "incidunt in itaque",
      //         "value": 502
      //       }
      //     },
      //     {
      //       "type": "velit",
      //       "id": 12,
      //       "userName": "Broderick Yost",
      //       "userEmail": "Gertrude_Frami84@hotmail.com",
      //       "location": [
      //         "Ida Burgs New Jersey,95984 Equatorial Guinea",
      //         "Amelia Wells Ohio,36645 Egypt",
      //         "Haven Burgs Montana,31801-5875 Virgin Islands, British"
      //       ],
      //       "baseLine": {
      //         "type": "molestias officiis molestiae",
      //         "value": 197
      //       }
      //     }
      //   ]
      },
      location: [
        { name: "Newyork Branch", isChecked: false },
        { name: "Newyork Branch", isChecked: false },
        { name: "Newyork Branch", isChecked: false },
      ],
      flowKey: "purchaseRequisition",
      createNewStepOpen: false,
      createNewStep: {
        userName: "",
        userEmail: "",
        baseLine: { type: "", value: "" },
        location: [],
      },
      usersList: [
      //   {
      //     "username": "Deontae Greenholt",
      //     "id": 1,
      //     "email": "Arturo.Bogisich@hotmail.com",
      //     "groups": [
      //       {
      //         "id": 77,
      //         "groupsName": "dignissimos",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 72,
      //             "rolesName": "quisquam"
      //           },
      //           {
      //             "id": 18,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 28,
      //             "rolesName": "tenetur"
      //           },
      //           {
      //             "id": 91,
      //             "rolesName": "rerum"
      //           },
      //           {
      //             "id": 13,
      //             "rolesName": "alias"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 46,
      //         "groupsName": "deserunt",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 13,
      //             "rolesName": "minus"
      //           },
      //           {
      //             "id": 61,
      //             "rolesName": "accusamus"
      //           },
      //           {
      //             "id": 65,
      //             "rolesName": "laboriosam"
      //           },
      //           {
      //             "id": 35,
      //             "rolesName": "eos"
      //           },
      //           {
      //             "id": 17,
      //             "rolesName": "consequuntur"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 15,
      //         "groupsName": "est",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 24,
      //             "rolesName": "velit"
      //           },
      //           {
      //             "id": 27,
      //             "rolesName": "ad"
      //           },
      //           {
      //             "id": 82,
      //             "rolesName": "impedit"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "magnam"
      //           },
      //           {
      //             "id": 49,
      //             "rolesName": "suscipit"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 72,
      //         "groupsName": "nostrum",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 23,
      //             "rolesName": "est"
      //           },
      //           {
      //             "id": 54,
      //             "rolesName": "temporibus"
      //           },
      //           {
      //             "id": 42,
      //             "rolesName": "impedit"
      //           },
      //           {
      //             "id": 67,
      //             "rolesName": "maiores"
      //           },
      //           {
      //             "id": 67,
      //             "rolesName": "sapiente"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 98,
      //         "groupsName": "beatae",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 96,
      //             "rolesName": "neque"
      //           },
      //           {
      //             "id": 63,
      //             "rolesName": "nobis"
      //           },
      //           {
      //             "id": 91,
      //             "rolesName": "ut"
      //           },
      //           {
      //             "id": 14,
      //             "rolesName": "distinctio"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "reiciendis"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Elsa Veum",
      //     "id": 2,
      //     "email": "Malvina11@gmail.com",
      //     "groups": [
      //       {
      //         "id": 87,
      //         "groupsName": "et",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 48,
      //             "rolesName": "esse"
      //           },
      //           {
      //             "id": 59,
      //             "rolesName": "odit"
      //           },
      //           {
      //             "id": 63,
      //             "rolesName": "sed"
      //           },
      //           {
      //             "id": 42,
      //             "rolesName": "dolorem"
      //           },
      //           {
      //             "id": 24,
      //             "rolesName": "autem"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 14,
      //         "groupsName": "et",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 81,
      //             "rolesName": "quasi"
      //           },
      //           {
      //             "id": 42,
      //             "rolesName": "asperiores"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "natus"
      //           },
      //           {
      //             "id": 2,
      //             "rolesName": "consequatur"
      //           },
      //           {
      //             "id": 49,
      //             "rolesName": "aspernatur"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 35,
      //         "groupsName": "veniam",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 44,
      //             "rolesName": "dolore"
      //           },
      //           {
      //             "id": 6,
      //             "rolesName": "itaque"
      //           },
      //           {
      //             "id": 75,
      //             "rolesName": "neque"
      //           },
      //           {
      //             "id": 65,
      //             "rolesName": "perferendis"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "minus"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 56,
      //         "groupsName": "ea",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 68,
      //             "rolesName": "provident"
      //           },
      //           {
      //             "id": 80,
      //             "rolesName": "eius"
      //           },
      //           {
      //             "id": 61,
      //             "rolesName": "a"
      //           },
      //           {
      //             "id": 5,
      //             "rolesName": "quibusdam"
      //           },
      //           {
      //             "id": 74,
      //             "rolesName": "odit"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 89,
      //         "groupsName": "omnis",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 55,
      //             "rolesName": "eveniet"
      //           },
      //           {
      //             "id": 46,
      //             "rolesName": "dolores"
      //           },
      //           {
      //             "id": 53,
      //             "rolesName": "rerum"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "quia"
      //           },
      //           {
      //             "id": 85,
      //             "rolesName": "dolorem"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Thea Pacocha",
      //     "id": 3,
      //     "email": "Maryjane.Homenick@hotmail.com",
      //     "groups": [
      //       {
      //         "id": 51,
      //         "groupsName": "ut",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 81,
      //             "rolesName": "error"
      //           },
      //           {
      //             "id": 65,
      //             "rolesName": "nihil"
      //           },
      //           {
      //             "id": 85,
      //             "rolesName": "qui"
      //           },
      //           {
      //             "id": 6,
      //             "rolesName": "nulla"
      //           },
      //           {
      //             "id": 70,
      //             "rolesName": "totam"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 61,
      //         "groupsName": "tempore",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 85,
      //             "rolesName": "beatae"
      //           },
      //           {
      //             "id": 41,
      //             "rolesName": "accusamus"
      //           },
      //           {
      //             "id": 97,
      //             "rolesName": "praesentium"
      //           },
      //           {
      //             "id": 92,
      //             "rolesName": "omnis"
      //           },
      //           {
      //             "id": 36,
      //             "rolesName": "sit"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 1,
      //         "groupsName": "alias",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 76,
      //             "rolesName": "rem"
      //           },
      //           {
      //             "id": 62,
      //             "rolesName": "aperiam"
      //           },
      //           {
      //             "id": 8,
      //             "rolesName": "error"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "occaecati"
      //           },
      //           {
      //             "id": 84,
      //             "rolesName": "et"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 85,
      //         "groupsName": "molestiae",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 70,
      //             "rolesName": "voluptas"
      //           },
      //           {
      //             "id": 79,
      //             "rolesName": "adipisci"
      //           },
      //           {
      //             "id": 14,
      //             "rolesName": "numquam"
      //           },
      //           {
      //             "id": 90,
      //             "rolesName": "temporibus"
      //           },
      //           {
      //             "id": 60,
      //             "rolesName": "vitae"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 94,
      //         "groupsName": "corrupti",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 59,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 78,
      //             "rolesName": "rem"
      //           },
      //           {
      //             "id": 29,
      //             "rolesName": "debitis"
      //           },
      //           {
      //             "id": 9,
      //             "rolesName": "voluptas"
      //           },
      //           {
      //             "id": 54,
      //             "rolesName": "aut"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Berneice Mitchell",
      //     "id": 4,
      //     "email": "Evan_Strosin99@hotmail.com",
      //     "groups": [
      //       {
      //         "id": 60,
      //         "groupsName": "doloremque",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 65,
      //             "rolesName": "consequatur"
      //           },
      //           {
      //             "id": 81,
      //             "rolesName": "quibusdam"
      //           },
      //           {
      //             "id": 45,
      //             "rolesName": "rem"
      //           },
      //           {
      //             "id": 1,
      //             "rolesName": "magnam"
      //           },
      //           {
      //             "id": 36,
      //             "rolesName": "culpa"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 44,
      //         "groupsName": "omnis",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 33,
      //             "rolesName": "tempore"
      //           },
      //           {
      //             "id": 90,
      //             "rolesName": "tenetur"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "dolor"
      //           },
      //           {
      //             "id": 43,
      //             "rolesName": "reprehenderit"
      //           },
      //           {
      //             "id": 79,
      //             "rolesName": "sequi"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 76,
      //         "groupsName": "iure",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 49,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 81,
      //             "rolesName": "porro"
      //           },
      //           {
      //             "id": 65,
      //             "rolesName": "quia"
      //           },
      //           {
      //             "id": 65,
      //             "rolesName": "doloribus"
      //           },
      //           {
      //             "id": 11,
      //             "rolesName": "dicta"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 58,
      //         "groupsName": "magni",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 25,
      //             "rolesName": "magnam"
      //           },
      //           {
      //             "id": 96,
      //             "rolesName": "a"
      //           },
      //           {
      //             "id": 31,
      //             "rolesName": "maiores"
      //           },
      //           {
      //             "id": 78,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 37,
      //             "rolesName": "modi"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 69,
      //         "groupsName": "qui",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 15,
      //             "rolesName": "quis"
      //           },
      //           {
      //             "id": 33,
      //             "rolesName": "velit"
      //           },
      //           {
      //             "id": 3,
      //             "rolesName": "eaque"
      //           },
      //           {
      //             "id": 91,
      //             "rolesName": "ab"
      //           },
      //           {
      //             "id": 91,
      //             "rolesName": "et"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Garnet Heaney",
      //     "id": 5,
      //     "email": "Jakob.Harris64@yahoo.com",
      //     "groups": [
      //       {
      //         "id": 84,
      //         "groupsName": "placeat",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 8,
      //             "rolesName": "rerum"
      //           },
      //           {
      //             "id": 82,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 80,
      //             "rolesName": "fugit"
      //           },
      //           {
      //             "id": 61,
      //             "rolesName": "porro"
      //           },
      //           {
      //             "id": 78,
      //             "rolesName": "sed"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 40,
      //         "groupsName": "aut",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 54,
      //             "rolesName": "earum"
      //           },
      //           {
      //             "id": 10,
      //             "rolesName": "temporibus"
      //           },
      //           {
      //             "id": 19,
      //             "rolesName": "a"
      //           },
      //           {
      //             "id": 55,
      //             "rolesName": "perspiciatis"
      //           },
      //           {
      //             "id": 8,
      //             "rolesName": "et"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 62,
      //         "groupsName": "nulla",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 32,
      //             "rolesName": "assumenda"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "nulla"
      //           },
      //           {
      //             "id": 69,
      //             "rolesName": "consequatur"
      //           },
      //           {
      //             "id": 30,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 61,
      //             "rolesName": "voluptatem"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 21,
      //         "groupsName": "facere",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 3,
      //             "rolesName": "id"
      //           },
      //           {
      //             "id": 89,
      //             "rolesName": "tempore"
      //           },
      //           {
      //             "id": 56,
      //             "rolesName": "neque"
      //           },
      //           {
      //             "id": 61,
      //             "rolesName": "perferendis"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "ducimus"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 99,
      //         "groupsName": "hic",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 59,
      //             "rolesName": "cumque"
      //           },
      //           {
      //             "id": 53,
      //             "rolesName": "fugit"
      //           },
      //           {
      //             "id": 70,
      //             "rolesName": "vel"
      //           },
      //           {
      //             "id": 93,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 76,
      //             "rolesName": "accusamus"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Bernhard Denesik",
      //     "id": 6,
      //     "email": "Vida.Kuvalis@gmail.com",
      //     "groups": [
      //       {
      //         "id": 86,
      //         "groupsName": "atque",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 77,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 16,
      //             "rolesName": "eaque"
      //           },
      //           {
      //             "id": 84,
      //             "rolesName": "itaque"
      //           },
      //           {
      //             "id": 24,
      //             "rolesName": "sint"
      //           },
      //           {
      //             "id": 33,
      //             "rolesName": "quis"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 34,
      //         "groupsName": "autem",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 84,
      //             "rolesName": "perferendis"
      //           },
      //           {
      //             "id": 98,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 74,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 12,
      //             "rolesName": "earum"
      //           },
      //           {
      //             "id": 75,
      //             "rolesName": "nobis"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 90,
      //         "groupsName": "maxime",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 10,
      //             "rolesName": "impedit"
      //           },
      //           {
      //             "id": 38,
      //             "rolesName": "eveniet"
      //           },
      //           {
      //             "id": 64,
      //             "rolesName": "quia"
      //           },
      //           {
      //             "id": 52,
      //             "rolesName": "ea"
      //           },
      //           {
      //             "id": 99,
      //             "rolesName": "occaecati"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 1,
      //         "groupsName": "voluptatem",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 60,
      //             "rolesName": "dolorem"
      //           },
      //           {
      //             "id": 71,
      //             "rolesName": "non"
      //           },
      //           {
      //             "id": 86,
      //             "rolesName": "dicta"
      //           },
      //           {
      //             "id": 93,
      //             "rolesName": "sed"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "aliquam"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 10,
      //         "groupsName": "molestiae",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 63,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 40,
      //             "rolesName": "unde"
      //           },
      //           {
      //             "id": 36,
      //             "rolesName": "necessitatibus"
      //           },
      //           {
      //             "id": 30,
      //             "rolesName": "non"
      //           },
      //           {
      //             "id": 71,
      //             "rolesName": "odit"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Ettie Kiehn",
      //     "id": 7,
      //     "email": "Hoyt.Purdy39@gmail.com",
      //     "groups": [
      //       {
      //         "id": 33,
      //         "groupsName": "aut",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 91,
      //             "rolesName": "doloremque"
      //           },
      //           {
      //             "id": 84,
      //             "rolesName": "nobis"
      //           },
      //           {
      //             "id": 74,
      //             "rolesName": "consequatur"
      //           },
      //           {
      //             "id": 7,
      //             "rolesName": "unde"
      //           },
      //           {
      //             "id": 78,
      //             "rolesName": "nam"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 83,
      //         "groupsName": "cum",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 31,
      //             "rolesName": "enim"
      //           },
      //           {
      //             "id": 84,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 40,
      //             "rolesName": "placeat"
      //           },
      //           {
      //             "id": 90,
      //             "rolesName": "molestiae"
      //           },
      //           {
      //             "id": 60,
      //             "rolesName": "suscipit"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 39,
      //         "groupsName": "totam",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 75,
      //             "rolesName": "ducimus"
      //           },
      //           {
      //             "id": 63,
      //             "rolesName": "tenetur"
      //           },
      //           {
      //             "id": 62,
      //             "rolesName": "eos"
      //           },
      //           {
      //             "id": 30,
      //             "rolesName": "adipisci"
      //           },
      //           {
      //             "id": 29,
      //             "rolesName": "aut"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 46,
      //         "groupsName": "eum",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 77,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 46,
      //             "rolesName": "repudiandae"
      //           },
      //           {
      //             "id": 9,
      //             "rolesName": "sunt"
      //           },
      //           {
      //             "id": 20,
      //             "rolesName": "sunt"
      //           },
      //           {
      //             "id": 60,
      //             "rolesName": "voluptas"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 6,
      //         "groupsName": "voluptatibus",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 50,
      //             "rolesName": "sequi"
      //           },
      //           {
      //             "id": 7,
      //             "rolesName": "ex"
      //           },
      //           {
      //             "id": 17,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 93,
      //             "rolesName": "ut"
      //           },
      //           {
      //             "id": 26,
      //             "rolesName": "consequatur"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Trenton Cole",
      //     "id": 8,
      //     "email": "Samara12@yahoo.com",
      //     "groups": [
      //       {
      //         "id": 14,
      //         "groupsName": "fuga",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 49,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 96,
      //             "rolesName": "quis"
      //           },
      //           {
      //             "id": 33,
      //             "rolesName": "quae"
      //           },
      //           {
      //             "id": 23,
      //             "rolesName": "delectus"
      //           },
      //           {
      //             "id": 83,
      //             "rolesName": "est"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 12,
      //         "groupsName": "sunt",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 10,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 74,
      //             "rolesName": "molestias"
      //           },
      //           {
      //             "id": 52,
      //             "rolesName": "tempora"
      //           },
      //           {
      //             "id": 40,
      //             "rolesName": "vero"
      //           },
      //           {
      //             "id": 13,
      //             "rolesName": "et"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 47,
      //         "groupsName": "minima",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 58,
      //             "rolesName": "facere"
      //           },
      //           {
      //             "id": 20,
      //             "rolesName": "quia"
      //           },
      //           {
      //             "id": 70,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 5,
      //             "rolesName": "sequi"
      //           },
      //           {
      //             "id": 90,
      //             "rolesName": "delectus"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 32,
      //         "groupsName": "facere",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 69,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 79,
      //             "rolesName": "omnis"
      //           },
      //           {
      //             "id": 15,
      //             "rolesName": "ex"
      //           },
      //           {
      //             "id": 87,
      //             "rolesName": "possimus"
      //           },
      //           {
      //             "id": 77,
      //             "rolesName": "odit"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 13,
      //         "groupsName": "corporis",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 93,
      //             "rolesName": "atque"
      //           },
      //           {
      //             "id": 63,
      //             "rolesName": "sint"
      //           },
      //           {
      //             "id": 57,
      //             "rolesName": "iste"
      //           },
      //           {
      //             "id": 96,
      //             "rolesName": "qui"
      //           },
      //           {
      //             "id": 81,
      //             "rolesName": "repellendus"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Gabe Gutmann",
      //     "id": 9,
      //     "email": "Tessie_Wintheiser@hotmail.com",
      //     "groups": [
      //       {
      //         "id": 14,
      //         "groupsName": "sint",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 9,
      //             "rolesName": "officia"
      //           },
      //           {
      //             "id": 67,
      //             "rolesName": "omnis"
      //           },
      //           {
      //             "id": 79,
      //             "rolesName": "corporis"
      //           },
      //           {
      //             "id": 92,
      //             "rolesName": "aut"
      //           },
      //           {
      //             "id": 87,
      //             "rolesName": "quidem"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 83,
      //         "groupsName": "impedit",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 71,
      //             "rolesName": "porro"
      //           },
      //           {
      //             "id": 93,
      //             "rolesName": "ipsum"
      //           },
      //           {
      //             "id": 66,
      //             "rolesName": "architecto"
      //           },
      //           {
      //             "id": 94,
      //             "rolesName": "omnis"
      //           },
      //           {
      //             "id": 67,
      //             "rolesName": "ut"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 46,
      //         "groupsName": "est",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 71,
      //             "rolesName": "neque"
      //           },
      //           {
      //             "id": 63,
      //             "rolesName": "et"
      //           },
      //           {
      //             "id": 41,
      //             "rolesName": "earum"
      //           },
      //           {
      //             "id": 11,
      //             "rolesName": "culpa"
      //           },
      //           {
      //             "id": 43,
      //             "rolesName": "quasi"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 93,
      //         "groupsName": "consequuntur",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 82,
      //             "rolesName": "voluptas"
      //           },
      //           {
      //             "id": 68,
      //             "rolesName": "occaecati"
      //           },
      //           {
      //             "id": 21,
      //             "rolesName": "fuga"
      //           },
      //           {
      //             "id": 33,
      //             "rolesName": "ad"
      //           },
      //           {
      //             "id": 85,
      //             "rolesName": "esse"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 93,
      //         "groupsName": "ut",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 19,
      //             "rolesName": "neque"
      //           },
      //           {
      //             "id": 92,
      //             "rolesName": "ullam"
      //           },
      //           {
      //             "id": 47,
      //             "rolesName": "molestias"
      //           },
      //           {
      //             "id": 39,
      //             "rolesName": "voluptatem"
      //           },
      //           {
      //             "id": 85,
      //             "rolesName": "voluptatum"
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "username": "Patrick Hessel",
      //     "id": 10,
      //     "email": "Roderick.Jakubowski@gmail.com",
      //     "groups": [
      //       {
      //         "id": 90,
      //         "groupsName": "neque",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 97,
      //             "rolesName": "voluptas"
      //           },
      //           {
      //             "id": 5,
      //             "rolesName": "sit"
      //           },
      //           {
      //             "id": 32,
      //             "rolesName": "aliquid"
      //           },
      //           {
      //             "id": 92,
      //             "rolesName": "corrupti"
      //           },
      //           {
      //             "id": 8,
      //             "rolesName": "excepturi"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 40,
      //         "groupsName": "sunt",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 10,
      //             "rolesName": "maxime"
      //           },
      //           {
      //             "id": 27,
      //             "rolesName": "repudiandae"
      //           },
      //           {
      //             "id": 81,
      //             "rolesName": "repellat"
      //           },
      //           {
      //             "id": 30,
      //             "rolesName": "ut"
      //           },
      //           {
      //             "id": 47,
      //             "rolesName": "quos"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 19,
      //         "groupsName": "officia",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 61,
      //             "rolesName": "asperiores"
      //           },
      //           {
      //             "id": 54,
      //             "rolesName": "cum"
      //           },
      //           {
      //             "id": 28,
      //             "rolesName": "quis"
      //           },
      //           {
      //             "id": 99,
      //             "rolesName": "recusandae"
      //           },
      //           {
      //             "id": 67,
      //             "rolesName": "voluptatum"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 72,
      //         "groupsName": "voluptas",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 17,
      //             "rolesName": "repudiandae"
      //           },
      //           {
      //             "id": 48,
      //             "rolesName": "sit"
      //           },
      //           {
      //             "id": 86,
      //             "rolesName": "dignissimos"
      //           },
      //           {
      //             "id": 97,
      //             "rolesName": "non"
      //           },
      //           {
      //             "id": 77,
      //             "rolesName": "pariatur"
      //           }
      //         ]
      //       },
      //       {
      //         "id": 67,
      //         "groupsName": "voluptatum",
      //         "permissionsAndRoles": [
      //           {
      //             "id": 37,
      //             "rolesName": "saepe"
      //           },
      //           {
      //             "id": 8,
      //             "rolesName": "non"
      //           },
      //           {
      //             "id": 77,
      //             "rolesName": "ipsa"
      //           },
      //           {
      //             "id": 80,
      //             "rolesName": "veritatis"
      //           },
      //           {
      //             "id": 95,
      //             "rolesName": "ex"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      ],
      createStepValidat: false,
      editStep: false,
      editIndex: -1,
      userId: -1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getWorkflow());
    dispatch(settingAction.getUsers());
  }
  clearFields = () => {
    this.setState({
      createNewStep: {
        userName: "",
        userEmail: "",
        userId:null,
        baseLine: { type: "", value: "" },
        location: [],
      },
      createStepValidat: false,
      createNewStepOpen: false,
      
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      get_approval_workflow_status,
      get_approval_workflow_data,
      add_approval_workflow_status,
      remove_approval_workflow_status,
      get_users_status,
      get_users_data,
      update_approval_workflow_status,
      dispatch,
    } = this.props;
    if (
      get_approval_workflow_status !== prevProps.get_approval_workflow_status &&
      get_approval_workflow_status === status.SUCCESS
    ) {
      if (
        get_approval_workflow_data &&
        Object.keys(get_approval_workflow_data).length > 0
      ) {
        this.setState({ workFlowData: { ...get_approval_workflow_data } });
      }
    }
    if (
      add_approval_workflow_status !== prevProps.add_approval_workflow_status &&
      add_approval_workflow_status === status.SUCCESS
    ) {
      this.clearFields();
      dispatch(settingAction.getWorkflow());
    }
    if (
      remove_approval_workflow_status !==
      prevProps.remove_approval_workflow_status &&
      remove_approval_workflow_status === status.SUCCESS
    ) {
      dispatch(settingAction.getWorkflow());
    }
    if (
      get_users_status !== prevProps.get_users_status &&
      get_users_status === status.SUCCESS
    ) {
      this.setState({
        usersList: [...JSON.parse(JSON.stringify(get_users_data))],
      });
    }
    if (
      update_approval_workflow_status !== prevProps.update_approval_workflow_status &&
      update_approval_workflow_status === status.SUCCESS
    ) {
      this.clearFields();
      dispatch(settingAction.getWorkflow());
    }

  }
  removeWorkFlowField = (index) => {
    const { dispatch } = this.props;
    const { workFlowData, flowKey } = this.state;
    if (workFlowData[flowKey][index]) {
      dispatch(
        settingAction.removeWorkFlow({
          type: flowKey,
          ...workFlowData[flowKey][index],
        })
      );
    }
  };

  createNewStepModal = () => {
    this.clearFields()
    this.setState({
      createNewStepOpen: !this.state.createNewStepOpen,
      editStep: false,
      editIndex: -1,
    });
  };

  handleCreateNewStep = (e) => {
    let { name, value } = e.target;
    let { createNewStep, userId, usersList } = this.state;
    if (name === "value" || name === "type") {
      createNewStep.baseLine[name] = value;
    } else if (name === "userId") {
      createNewStep[name]= value
      if (value===""){
        createNewStep.userEmail=""
        createNewStep.userName=""
      }else{
      for(let i =0; i<usersList.length; i++){
        let user=usersList[i];
        if (user.id==value){
          createNewStep.userEmail=user.email;
          createNewStep.userName=user.username
        }
      }
      }
      this.setState({createNewStep });
      if (value) {
       
       
      }
    } else {
      createNewStep[name] = value;
    }
    this.setState({ createNewStep });
  };

  handleLocation = (index, e) => {
    let { location, createNewStep } = this.state;
    const { name, checked } = e.target;
    let selectedLocations = [];
    location[index].isChecked = checked;
    this.setState({ location });
    for (let i = 0; i < location.length; i++) {
      if (location[i].isChecked) {
        selectedLocations.push(location[i].name);
      }
    }
    createNewStep.location = [...selectedLocations];
    this.setState({ createNewStep });
  };

  createStepValidatingFields = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { createNewStep } = this.state;
    let isValid = true;
    const retData = {
      userName: validObj,
      type: validObj,
      value: validObj,
      location: validObj,
    };
    if (update) {
      if (!createNewStep.userName) {
        retData.userName = {
          isValid: false,
          message: "Name is required",
        };
        isValid = false;
      }
      if (!createNewStep.baseLine.value) {
        retData.value = {
          isValid: false,
          message: "Baseline approval value is required",
        };
        isValid = false;
      }
      if (!createNewStep.baseLine.type) {
        retData.type = {
          isValid: false,
          message: "Baseline approval type is required",
        };
        isValid = false;
      }
      if (!createNewStep.location.length > 0) {
        retData.location = {
          isValid: false,
          message: "Location is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  createNewStep = () => {
    let createStepError = this.createStepValidatingFields(true);
    const { createNewStep, flowKey } = this.state;
    this.setState({ createStepValidat: true });
    if (createStepError.isValid) {
      this.props.dispatch(
        settingAction.addWrokFlow({ type: flowKey, ...createNewStep })
      );
    }
  };

  handleEdit = (index) => {
    let { workFlowData, createNewStep, flowKey } = this.state;
    createNewStep = workFlowData[flowKey][index];
    this.setState({
      editStep: true,
      createNewStep,
      createNewStepOpen: true,
      editIndex: index,
    });

  };

  SubmitEditStep = () => {
    let createStepError = this.createStepValidatingFields(true);
    const { createNewStep, flowKey } = this.state;
    this.setState({ createStepValidat: true });
    if (createStepError.isValid) {
      this.props.dispatch(
        settingAction.updateWorkFlow({ type: flowKey, ...createNewStep })
      );
    }
  }
  render() {
    const {
      workFlowData,
      flowKey,
      createNewStepOpen,
      createNewStep,
      location,
      createStepValidat,
      usersList,
      editStep,
    } = this.state;
    let createStepError = this.createStepValidatingFields(createStepValidat);
    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Approval Workflow</div>
            <div className="tabs">
              <ul>
                <li
                  className={flowKey === "purchaseRequisition" ? "active" : ""}
                  onClick={() =>
                    this.setState({ flowKey: "purchaseRequisition" })
                  }
                >
                  Purchase Requisition
                </li>
                <li
                  className={flowKey === "purchaseOrder" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "purchaseOrder" })}
                >
                  Purchase Order
                </li>
                <li
                  className={flowKey === "invoice" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "invoice" })}
                >
                  Invoice
                </li>
                <li
                  className={flowKey === "payments" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "payments" })}
                >
                  Payments
                </li>
              </ul>
            </div>
            <div className="tabs-content active">
              <div className="create-step">
                <ul>
                  {workFlowData &&
                    workFlowData[flowKey] &&
                    workFlowData[flowKey].length > 0 &&
                    workFlowData[flowKey].map(
                      ({ userName, email, id }, index) => (
                        <li key={`${index}-flow`}>
                          <div className="number">
                            <span>{index + 1}</span>
                          </div>
                          <div className="step-box">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-9 col-9">
                                  <div className="heading">
                                    Procurement Admin
                                  </div>
                                  {userName && (
                                    <div className="name">{userName}</div>
                                  )}
                                  {email && (
                                    <div className="email">{email}</div>
                                  )}
                                </div>
                                <div className="col-md-3 col-3">
                                  <div className="group-btn">
                                    <Button
                                      className="btn btn-primary btn-trash"
                                      onClick={() => {
                                        this.removeWorkFlowField(index);
                                      }}
                                    >
                                      <i className="far fa-trash-alt"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-primary btn-edit"
                                      onClick={() => this.handleEdit(index)}
                                    >
                                      <i className="far fa-edit"></i>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  <li>
                    <div className="number">
                      {workFlowData[flowKey] &&
                        workFlowData[flowKey].length > 0 ? (
                        <span>{workFlowData[flowKey].length + 1}</span>
                      ) : (
                        <span>{1}</span>
                      )}
                    </div>
                    <div className="step-box">
                      <Button
                        className="btn btn-primary btn-create"
                        onClick={this.createNewStepModal}
                      >
                        Create new step
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={createNewStepOpen}
          onClose={this.createNewStepModal}
          aria-labelledby="form-dialog-title"
          className="custom-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              {!editStep ? `Create Approval Step` : `Edit Approval Step`}
            </DialogTitle>
            <Button
              onClick={this.createNewStepModal}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">User Name</label>
                  <div className="col-12 col-form-field">
                    <FormControl className="select-menu">
                      <NativeSelect
                        name="userId"
                        onChange={this.handleCreateNewStep}
                        value={`${createNewStep.userId}`}
                      >
                        <option value={""}>Select User</option>
                        {usersList &&
                          usersList.length > 0 &&
                          usersList.map(({ id, username }, index) => (
                            <option value={id} key={`${index}-options`}>{username}</option>
                          ))}
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {createStepError.userName.message}
                    </span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={this.handleCreateNewStep}
                  >
                    <label className="col-12 col-form-label">
                      Baseline approval
                    </label>
                    <div className="col-12 col-form-field">
                      {/* <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
                      <FormControlLabel
                        value=""
                        control={<Radio name="type" color="primary" />}
                        label="Edit Approval Step"
                        style={{ margin: "0px" }}
                      />
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Less or Equal"
                        control={<Radio name="type" color="primary" />}
                        label="Less or Equal"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Less or Equal" ? (
                        <>
                          <input
                            type="text"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                            className="form-control baseLine"
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form"
                        control={<Radio name="type" color="primary" />}
                        label="Form"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Form" ? (
                        <>
                          <input
                            type="text"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                            className="form-control baseLine"
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form To"
                        control={<Radio name="type" color="primary" />}
                        label="Form To"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Form To" ? (
                        <>
                          <input
                            type="text"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                            className="form-control baseLine"
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </RadioGroup>
                  <span className="d-block w-100 text-danger">
                    {createStepError.type.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">Location</label>
                  {location &&
                    location.length > 0 &&
                    location.map(({ name, isChecked }, index) => (
                      <div key={index} className="col-12 col-form-field">
                        <FormControlLabel
                          value={isChecked}
                          onChange={(e) => this.handleLocation(index, e)}
                          control={<Checkbox name="location" color="primary" />}
                          label={name}
                          style={{ margin: "0px" }}
                        />
                      </div>
                    ))}
                  <span className="d-block w-100 text-danger">
                    {createStepError.location.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group row form-group justify-content-end">
              <div className="col-3 form-field text-right">
                {!editStep ? (
                  <Button
                    variant="contained"
                    className="create-btn"
                    onClick={this.createNewStep}
                  >
                    Create
                  </Button>
                ) : (
                  <Button variant="contained" className="create-btn" onClick={(this.SubmitEditStep)}>
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    get_approval_workflow_status,
    get_approval_workflow_data,
    add_approval_workflow_status,
    remove_approval_workflow_status,
    get_users_status,
    get_users_data,
    update_approval_workflow_status,
  } = state.procurement;
  return {
    get_approval_workflow_status,
    get_approval_workflow_data,
    add_approval_workflow_status,
    remove_approval_workflow_status,
    get_users_status,
    get_users_data,
    update_approval_workflow_status
  };
};

export default connect(mapStateToProps)(ApprovalWorkFlow);
