TARGET=CCC_DB

###########################
#Library
###########################
MARIA_LIB1=/usr/include/mysql/
MARIA_LIB2=/usr/lib64/mysql
SSL_LIB=/usr/local/ssl/lib

###########################
#Option
###########################
CC              = g++
DEBUG_OPTION    =-g -Wall
DEFINE          =-DLINUX32
COLOAD_LIBS     =-lnsl\
				 -lstdc++\
                 -lpthread\
                 -ldl\
                 -lmysqlclient\
                 -lm\
                 -lssl\
                 -lcrypto\
                 -lz\
				 -std=c++11\

COLIB_PATH      = -I$(MARIA_LIB1) -L$(MARIA_LIB2) -L$(SSL_LIB)
CFLAGS          = -Wno-multichar -Wno-sign-compare

OBJS        = main.o mysql_connector.o
$(TARGET)  :   $(OBJS)
	@$(CC) -o $(TARGET) $(DEBUG_OPTION) $(CFLAGS) $(OBJS) $(COLIB_PATH) $(COLOAD_LIBS)


all: ${TARGET}
	@echo "****************************"
	@echo $(TARGET) made successfully.
	@echo "****************************"

clean:
	rm -f $(OBJS) $(TARGET)

main.o: ./main.cpp
	@$(CC) -c $(DEBUG_OPTION) ./main.cpp  $(DEFINE) $(CFLAGS) $(COLIB_PATH) $(COLOAD_LIBS)

    
