import 'dotenv/config';
import user from './models/user';
import bot from './tg';
import addButtonsToKeyboard from './addButtonsToKeyboard';
import { currencyPairsButtons, menuButtons, signals, states } from './config';
import getRandomNumber from './getRandomNumber';

const temporaryDates = new Map();
bot.onText(/\/start/, async (msg) => {
    try {
        const {id, username} = msg.from;
        const player = await user.getUserId(id);
        if(!player.length) {
            await user.addUserId(id, username);
            await bot.sendMessage(id, `Hey! \nHere you cat bet on signals\n\nPlease send me your binomo Id`)
            await user.updateUserState('binomoId', id);
            return;
        }
        await user.updateUserState('menu', id);
        const keyboardButtons = addButtonsToKeyboard(menuButtons, 1);
        await bot.sendMessage(id, `Please check menu below`,
        {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: keyboardButtons
            }
        });
    } catch (err) {
        console.log(err.message);
    }
});

bot.on('text', async (msg) => {
    try {
        const { id } = msg.from;
        const { text } = msg;
        const userState = await user.getUserState(id);
        if(userState[0]?.state === 'binomoId') {
            await user.updateUserBinomoId(id, text);
            await user.updateUserState('balance', id);
            await bot.deleteMessage(id, msg.message_id - 1);
            await bot.sendMessage(id, `Send me your balance please. It must contain only numbers`);
            return;
        }
        if(userState[0]?.state === 'balance') {
            if (!isNaN(text)) { // Проверка на число
                await user.updateUserBalance(id, Number(text));
                await user.updateUserState('menu', id);
                await bot.deleteMessage(id, msg.message_id - 1);
                const keyboardButtons = addButtonsToKeyboard(menuButtons, 1);
                await bot.sendMessage(id, 'Please check the menu below', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: keyboardButtons
                    }
                });
            } else {
                await bot.sendMessage(id, 'Please enter a valid number.');
            }
        }
    }catch (err) {
        console.log(err.message);
    }

});

bot.on('callback_query', async (msg) => {
    try {
        const {id} = msg.from;
        const {data} = msg;
        const userState = await user.getUserState(id);
        console.log(userState)
        if(userState[0]?.state === 'menu') {
            if(data === '/profile') {
                const userProfile = await user.getUserInfo(id);
                const deals = await user.getCountSuccsesfullUserDeals(id, true);
                await user.updateUserState('profile', id);
                const {binomo_id, balance } = userProfile[0];
                const randomDeals = getRandomNumber();
                await bot.deleteMessage(id, msg.message.message_id);
                await bot.sendMessage(id, `Your profile info\n\n🆔 Account: ${binomo_id}\n💰Balance: ${balance}\n\nAmount of succsesfull deals: ${Object.values(deals[0])}\n🏆successful transactions in an hour: ${randomDeals}`,{
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Back', callback_data: 'back'}
                            ]
                        ]
                    }
                })
                return;
            }
            if(data === '/vip') {
                await user.updateUserState('vip', id);
                await bot.deleteMessage(id, msg.message.message_id);
                await bot.sendPhoto(id, 'https://imgur.com/xJ91SfU',
                {
                    parse_mode: 'HTML',
                    caption: `Text trainer to help @costa_trade`,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Back', callback_data: 'back'}
                            ]
                        ]
                    }
                });
                return;
            }
            if(data === '/deals') {
                await user.updateUserState('deals', id);
                await bot.deleteMessage(id, msg.message.message_id);
                const deals = await user.getSuccsesfullUserDeals(id, true);
    
                const first10Deals = deals.map(item => {
                    const signalDate = new Date(item.signal_date);
                    const formattedDate = signalDate.toLocaleString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  
                    return `Currency Pair: ${item.currency_pair} - Date: ${formattedDate}\n`
                });
                await bot.sendMessage(id, `There is your last succsesfull 10 transactions:\n\n${first10Deals}`,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Back', callback_data: 'back'}
                            ]
                        ]
                    }
                });
                return;
            }
            if(data === '/signals') {
                await user.updateUserState('signals', id) 
                await bot.deleteMessage(id, msg.message.message_id);
                const keyboardButtons = addButtonsToKeyboard(currencyPairsButtons, 1);
                await bot.sendMessage(id, `Choose the currency pair\n\n`,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: keyboardButtons
                    }
                });
                return;
            }
        }
        if(data === 'back' && Object.values(states).includes(userState[0]?.state)) {
            console.log(data, userState[0].state)
                await user.updateUserState('menu', id);
                const keyboardButtons = addButtonsToKeyboard(menuButtons, 1);
                await bot.deleteMessage(id, msg.message.message_id);
                await bot.sendMessage(id, `Please check menu below`,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: keyboardButtons
                    }
                });
                return;
        }
        if(userState[0]?.state === 'signals') {
                if(signals.hasOwnProperty(data)) {
                    await bot.deleteMessage(id, msg.message.message_id);
                    const now = new Date();
                    const modifiedTime = new Date(now);
                    modifiedTime.setHours(modifiedTime.getHours() + 5);
                    modifiedTime.setMinutes(modifiedTime.getMinutes() + 30);
                    const actualTime = `${modifiedTime.getHours()}: ${modifiedTime.getMinutes()}: ${modifiedTime.getSeconds()}`;
                    const randomTimeToBet = Math.random() * (3 - 1) + 1;
                    const finalString = data.toUpperCase();
                    const randomProcent = Math.random() * (0.10 - 0.05) + 0.05;
                    const userInfo = await user.getUserInfo(id);
                    const randomValue = Math.random();
                    const result = randomValue < 0.5 ? "UP" : "DOWN";
                    const investingAmount = (userInfo[0]?.balance * randomProcent.toFixed(2));
                    await bot.sendMessage(id, `
                    🔸—SIGNAL—🔸   
                    Actual time ${actualTime}
                    You can start to bet from next minute ${modifiedTime.getHours()}: ${modifiedTime.getMinutes() + 1}
                    BET is ${(randomProcent * 100).toFixed(0)}% of balance
                    💲 Asset: ${finalString}
                    💵 Investing amount: ${investingAmount.toFixed(1)} rs   
                    ⏱️ Expiration time: ${randomTimeToBet.toFixed(0)} min  
                    ✅ Signal: ${result}`);
                    await bot.sendMessage(id, `After ${randomTimeToBet.toFixed(0)} minutes indicate your result`);
                    await user.updateUserState('waitingForAnswer', id);
                    setTimeout(async () => {
                        await bot.sendMessage(id, `Did you bet was sucssesfull?`, {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {text: 'Yes', callback_data: 'yes'},
                                        {text: 'No', callback_data: 'no'},
                                    ]
                                ]
                            }
                        })
                    }, (randomTimeToBet.toFixed(0) * 60 * 1000));
                    await user.addUserDeal(id, data, now);
                    temporaryDates.set(id, {
                        signalDate: now,
                        betAmount: investingAmount,
                        currencyPair: data
                    });
                }
    
            return;
        }
        if(userState[0]?.state === 'waitingForAnswer') {
            const {signalDate, betAmount, currencyPair} = temporaryDates.get(id);
            const userInfo = await user.getUserInfo(id);
            if(data === 'yes') {
                await bot.deleteMessage(id, msg.message.message_id);
                const newBalance = Number(userInfo[0].balance) + (Number(betAmount) * signals[currencyPair].value) - Number(betAmount);
                await user.updateUserPositiveDeals(true, signalDate);
                await user.updateUserBalance(id, newBalance);
                const keyboardButtons = addButtonsToKeyboard(currencyPairsButtons, 1);
                await bot.sendMessage(id, `You won ${((Number(betAmount) * signals[currencyPair].value) - Number(betAmount)).toFixed(1)}\n\nPlease choose currency pairs to play\n`,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: keyboardButtons
                    }
                });
                await user.updateUserState('signals', id);
                return;
            }
            if(data === 'no') {
                await bot.deleteMessage(id, msg.message.message_id);
                await user.updateUserNegativeDeals(false, signalDate);
                const newBalance = Number(userInfo[0].balance) - Number(betAmount);
                await user.updateUserNegativeDeals(true, signalDate);
                await user.updateUserBalance(id, newBalance);
                const keyboardButtons = addButtonsToKeyboard(menuButtons, 1);
                await bot.sendMessage(id, `Unfortunately you lost your bet\n\nPlease check menu below`,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: keyboardButtons
                    }
                });
                await user.updateUserState('menu', id);
                return;
            }
        }
    } catch (err) {
        console.log(err.message);
    }

})