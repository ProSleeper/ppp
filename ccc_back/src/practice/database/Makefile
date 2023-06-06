TARGET=CCC_DB

###########################
#Library
###########################
#UNAME := $(uname -o)
#ifneq ($(UNAME), Android)
#	MARIA_LIB1=/data/data/com.termux/files/usr/include/mariadb
#	MARIA_LIB2=/data/data/com.termux/files/usr/lib/mysql
#else
	MARIA_LIB1=/usr/include/mariadb
	MARIA_LIB2=/usr/lib64/mysql
#endif
SSL_LIB=/usr/local/ssl/lib

###########################
#Option
###########################
CC              = g++
DEBUG_OPTION    =-g -Wall
DEFINE          =-DLINUX32
COLOAD_LIBS     =-lmysqlclient
COLIB_PATH      =-I$(MARIA_LIB1) -L$(MARIA_LIB2) -L$(SSL_LIB)
CXXFLAGS        =-std=c++11 -Wno-multichar -Wno-sign-compare

OBJS        = main.o mysql_connector.o

$(TARGET)  :   $(OBJS)
	@$(CC) -o $(TARGET) $(DEBUG_OPTION) $(CXXFLAGS) $(OBJS) $(COLIB_PATH) $(COLOAD_LIBS)

all: ${TARGET}
	@echo "****************************"
	@echo $(TARGET) made successfully.
	@echo "****************************"

clean:
	rm -f $(OBJS) $(TARGET)

#main.o: ./main.cpp
#	@$(CC) -c $(DEBUG_OPTION) ./main.cpp  $(DEFINE) $(CFLAGS) $(COLIB_PATH) $(COLOAD_LIBS)

    
