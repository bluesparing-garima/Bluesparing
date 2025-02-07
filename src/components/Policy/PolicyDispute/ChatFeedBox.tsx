import React, { FC } from "react";
import {
  ChatFeedBoxProps,
  MsgContentProps,
  PolicyDisputeData,
} from "./IPolicyDispute";
import { SafeKaroUser } from "../../../context/constant";
import { useChatScroll } from "../../../Hooks/PolicyDispute/useChatScroll";
import { Field, Form } from "react-final-form";
import SendIcon from "@mui/icons-material/Send";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import AddPolicyDisputeMsgService from "../../../api/Policies/AddPolicyDisputeMsg/AddPolicyDisputeMsgService";
import generateFormData from "../../../utils/generateFromData";
const ChatFeedBox: FC<ChatFeedBoxProps> = (p) => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const ref = useChatScroll<MsgContentProps>({});

  const isYouSender = (id: string) => {
    if (userData.id === id) {
      return "Sender";
    }
    return "Viewer";
  };
  const onSubmit = (data: { message: string }, from: any) => {
    const msg = data.message;
    if (msg) {
      const payload: PolicyDisputeData = {
        policyId: p.policyId,
        policyNumber: p.policyNumber,
        comments: msg,
        image: "",
        senderId: userData.id,
        status: "active",
        senderName: userData.name,
        createdBy: userData.name || "",
      };
      p.handleDisputeData(payload);
      const chat = generateFormData(payload);
      AddPolicyDisputeMsgService(chat);
      from.reset();
    }
  };
  return (
    <div>
      <span className="text-safekaroDarkOrange font-satoshi font-medium">
        {p.policyRemarks}
      </span>
      <hr />
      {p.disputeData.length > 0 && (
        <div
          className="flex flex-col bg-blue-200 p-2 my-1 max-h-[35vh] scroll-hidden rounded shadow-lg space-y-2"
          ref={ref}
        >
          {p.disputeData.map((ele) => {
            const type = isYouSender(ele.senderId || "");
            return (
              <div
                key={ele.policyId}
                className={`flex flex-col ${
                  type === "Viewer" ? "items-end" : "items-start"
                } w-full`}
              >
                <div
                  className={`my-1 p-3 rounded text-base ${
                    type === "Viewer"
                      ? "bg-safekaroOrange text-white text-start"
                      : "bg-white text-black"
                  } w-3/4`}
                >
                  <div
                    className={`font-bold text-xs mb-1 ${
                      type === "Viewer" ? "text-white" : "text-black"
                    }`}
                  >
                    {ele.senderName}
                  </div>
                  <div>{ele.comments}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {p.isDispute === true && (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} className="relative mt-1">
                  <Field name="message">
                    {({ input }) => (
                      <TextField
                        {...input}
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={2} className="absolute right-12">
                  <Tooltip title="Send Message">
                    <IconButton color="primary" type="submit">
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </form>
          )}
        />
      )}
    </div>
  );
};
export default ChatFeedBox;
