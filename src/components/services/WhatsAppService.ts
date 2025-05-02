export interface WhatsAppMessagePayload {
    to: string; // Must be in E.164 format, e.g., +918957201725
    body: string;
    preview_url?: boolean;
    imageUrl?: string;  // Optional image URL (for logo, etc.)
    caption?: string;   // Optional caption for the image
  }
  
  const WHATSAPP_URL = process.env.REACT_APP_WHATSAPP!;
  const WHATSAPP_TOKEN = process.env.REACT_APP_WHATAPP_TOKEN!;
  
  // Send WhatsApp Message Service
  const sendWhatsAppMessage = async ({
    to,
    body,
    preview_url = false,
    imageUrl = "https://www.bluesparing.com/assets/images/logo.png", // Default logo
    caption = "Blue Sparing Logo", // Default caption
  }: WhatsAppMessagePayload): Promise<boolean> => {
    try {
      // Step 1: Send Text Message
      const response = await fetch(WHATSAPP_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual", // Message type for individual recipients
          to,  // The recipient's phone number (in E.164 format)
          type: "text",  // Message type (text message)
          text: {
            preview_url,  // Optional URL preview
            body,         // Message body content
          },
        }),
      });
  
      if (!response.ok) {
        console.error("WhatsApp API failed:", await response.json());
        return false;
      }
  
      // Step 2: Send Image (Blue Sparing Logo) as part of the message
      if (imageUrl) {
        const imageResponse = await fetch(WHATSAPP_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "image",
            image: {
              link: imageUrl,  // URL of the image to send (logo or any other image)
              caption,         // Optional caption for the image
            },
          }),
        });
  
        if (!imageResponse.ok) {
          console.error("WhatsApp image API failed:", await imageResponse.json());
          return false;
        }
      }
  
      console.log("WhatsApp message and image sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return false;
    }
  };
  
  export default sendWhatsAppMessage;

  
// ! For Policy and plan Expiry Reminder:
// Function to generate the WhatsApp message based on expiry type (Plan or Policy)
const generateWhatsAppMessage = (
    user: any,
    plan: any,
    selectedMonths: number,
    getTotalAmount: () => number,
    CalculateCurrentDate: () => string,
    calculatePlanEndDate: () => string,
    userData: any,
    reminderType: 'plan' | 'policy', // New parameter to differentiate between plan expiry and policy expiry
    expiryDate: string
  ) => {
    const baseMessage = `
      👋 Hi ${user?.name || userData?.name},
  
      ✅ Thank you for subscribing to the *${plan.planName}* plan.
  
      🗓 Duration: ${selectedMonths} month(s)  
      💼 Policies: ${
        Number(plan?.policyCount) * Number(selectedMonths) +
        (Number(userData?.policyCount) || 0)
      }  
      💰 Total Paid: ₹${getTotalAmount().toFixed(2)}  
      🕒 Start Date: ${new Date(CalculateCurrentDate()).toLocaleDateString()}  
      📆 End Date: ${new Date(calculatePlanEndDate()).toLocaleDateString()}
  
      Your invoice is available in your dashboard.
  
      🔵 BlueSparing Team
  
      For more information, visit: [Blue Sparing Website](https://iim.bluesparing.com/)
  
      **Hindi Version:**
  
      👋 नमस्ते ${user?.name || userData?.name},
  
      ✅ ${plan.planName} प्लान के लिए धन्यवाद।
  
      🗓 अवधि: ${selectedMonths} महीना(ओ)  
      💼 पॉलिसियां: ${
        Number(plan?.policyCount) * Number(selectedMonths) +
        (Number(userData?.policyCount) || 0)
      }  
      💰 कुल भुगतान: ₹${getTotalAmount().toFixed(2)}  
      🕒 शुरुआत तिथि: ${new Date(CalculateCurrentDate()).toLocaleDateString()}  
      📆 समाप्ति तिथि: ${new Date(calculatePlanEndDate()).toLocaleDateString()}
  
      आपका इनवॉइस आपके डैशबोर्ड में उपलब्ध है।
  
      🔵 BlueSparing Team
  
      For more information, visit: [Blue Sparing Website](https://iim.bluesparing.com/)
    `;
  
    if (reminderType === 'plan') {
      return `${baseMessage}
  
      ⚠️ Reminder: Your plan is expiring on ${new Date(expiryDate).toLocaleDateString()}. Please take action soon!`;
    } else if (reminderType === 'policy') {
      return `${baseMessage}
  
      ⚠️ Reminder: Your policy will expire on ${new Date(expiryDate).toLocaleDateString()}. Please renew it before the expiry date.`;
    }
  
    return baseMessage; // Default case if something goes wrong
  };
  
  