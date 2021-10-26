import { Telegraf } from "telegraf";
import getCpuDataServer1 from "./dataServer1.js";
import getCpuDataServer2 from "./dataServer2.js";
import getCpuAuthServer from "./authServer.js";
import getCpuUserServer1 from "./userServer1.js";
import getCpuUserServer2 from "./userServer2.js";

const bot = new Telegraf("2034834875:AAHOPcO5baK2JhLkLhGfrbLE5lXTQHE71UI");

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Xin chào tới Logging Bot, nếu Server của bạn quá tải, tôi sẽ thông báo cho bạn!",
    {}
  );

  const message1 = `Hãy chọn Server bạn muốn xem!`+`Nếu muốn kết thúc, hãy nhập: /exit`;

  bot.telegram.sendMessage(ctx.chat.id, message1, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "authServer",
            callback_data: "authServer",
          },
          {
            text: "dataServer1",
            callback_data: "dataServer1",
          },
          {
            text: "dataServer2",
            callback_data: "dataServer2",
          },
          {
            text: "userServer1",
            callback_data: "userServer1",
          },
          {
            text: "userServer2",
            callback_data: "userServer2",
          },
          {
            text: "allServer",
            callback_data: "allServer",
          },
        ],
      ],
    },
  });
});

    var interval1 = 0;
    var interval2 = 0;
    var interval3 = 0;
    var interval4 = 0;
    var interval5 = 0;
    var interval6 = 0;
    let x = 0;
    bot.action("authServer", (ctx) => {
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        clearInterval(interval5);
        clearInterval(interval6);
        interval1 = setInterval(async () => {
            if (await getCpuAuthServer() >= 90){
              bot.telegram.sendMessage(ctx.chat.id, "AuthServer quá tải", {});
            }
        }, 1000);
    });

    bot.action("dataServer1", (ctx) => {
        clearInterval(interval1);
        clearInterval(interval3);
        clearInterval(interval4);
        clearInterval(interval5);
        clearInterval(interval6);
        interval2 = setInterval(async() => {
            if (await getCpuDataServer1() >= 90) {
              bot.telegram.sendMessage(ctx.chat.id, "DataServer 1 quá tải", {});
            }
        }, 1000);
    });
    
    bot.action("dataServer2", (ctx) => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval4);
        clearInterval(interval5);
        clearInterval(interval6);
        interval3 = setInterval(async() => {
            if (await getCpuDataServer2() >= 90) {
              bot.telegram.sendMessage(ctx.chat.id, "DataServer 2 quá tải", {});
            }
        }, 1000);
    });

    bot.action("userServer1", (ctx) => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval5);
        clearInterval(interval6);
        interval4 = setInterval(async() => {
            if (await getCpuUserServer1() >= 90) {
              bot.telegram.sendMessage(ctx.chat.id, "UserServer 1 quá tải", {});
            }
        }, 1000);
    });

    bot.action("userServer2", (ctx) => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        clearInterval(interval6);
        interval5 = setInterval(async() => {
            if (await getCpuUserServer2() >= 90) {
              bot.telegram.sendMessage(ctx.chat.id, "UserServer 2 quá tải", {});
            }
        }, 1000);
    });

    bot.action("allServer", (ctx) => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
        clearInterval(interval4);
        clearInterval(interval5);
        interval6 = setInterval(async() => {
            if (await getCpuAuthServer() >= 90)
            bot.telegram.sendMessage(ctx.chat.id, "AuthServer quá tải", {});
            if (await getCpuDataServer() >= 90)
            bot.telegram.sendMessage(ctx.chat.id, "DataServer quá tải", {});
            if (await getCpuUserServer() >= 90)
            bot.telegram.sendMessage(ctx.chat.id, "UserServer quá tải", {});
        }, 1000);
    });

    bot.command('/exit', (ctx) => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      clearInterval(interval5);
      clearInterval(interval6);
      // Explicit usage
      ctx.telegram.leaveChat(ctx.message.chat.id);
    
      // Using context shortcut
      ctx.leaveChat();
    });
    
bot.launch();
